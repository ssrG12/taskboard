import Foundation
import MobileCoreServices
import React
import UIKit

@objc(CameraModule)
class CameraModule: NSObject, UIImagePickerControllerDelegate, UINavigationControllerDelegate {

  private var pickerController: UIImagePickerController?
  private var resolve: RCTPromiseResolveBlock?
  private var reject: RCTPromiseRejectBlock?

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @objc
  func takePicture(
    _ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock
  ) {

    DispatchQueue.main.async {
      guard let rootVC = self.getRootViewController() else {
        reject("NO_VIEW_CONTROLLER", "No view controller available", nil)
        return
      }

      guard UIImagePickerController.isSourceTypeAvailable(.camera) else {
        reject("CAMERA_UNAVAILABLE", "Camera not available", nil)
        return
      }

      self.resolve = resolve
      self.reject = reject

      let picker = UIImagePickerController()
      picker.sourceType = .camera
      picker.mediaTypes = [kUTTypeImage as String]
      picker.delegate = self
      picker.allowsEditing = false

      self.pickerController = picker
      rootVC.present(picker, animated: true)
    }
  }

  private func getRootViewController() -> UIViewController? {
    guard let window = UIApplication.shared.windows.first(where: { $0.isKeyWindow }) else {
      return nil
    }
    return window.rootViewController
  }

  func imagePickerController(
    _ picker: UIImagePickerController,
    didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey: Any]
  ) {
    picker.dismiss(animated: true)

    guard let image = info[.originalImage] as? UIImage else {
      self.reject?("NO_IMAGE", "No image captured", nil)
      return
    }

    if let imageData = image.jpegData(compressionQuality: 0.8) {
      let filename = "task_\(UUID().uuidString).jpg"
      let documentsPath = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
      let fileURL = documentsPath.appendingPathComponent(filename)

      do {
        try imageData.write(to: fileURL)

        let result: [String: Any] = [
          "uri": fileURL.absoluteString,
          "fileName": filename,
          "width": image.size.width,
          "height": image.size.height,
        ]

        self.resolve?(result)
      } catch {
        self.reject?("SAVE_ERROR", "Failed to save image", error)
      }
    } else {
      self.reject?("COMPRESSION_ERROR", "Failed to compress image", nil)
    }

    self.resolve = nil
    self.reject = nil
  }

  func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
    picker.dismiss(animated: true)
    self.reject?("CAMERA_CANCELLED", "User cancelled camera", nil)
    self.resolve = nil
    self.reject = nil
  }
}
