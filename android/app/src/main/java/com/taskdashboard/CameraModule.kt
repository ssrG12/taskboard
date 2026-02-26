package com.taskdashboard

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Environment
import android.provider.MediaStore
import androidx.core.content.FileProvider
import com.facebook.react.bridge.*
import java.io.File
import java.text.SimpleDateFormat
import java.util.*

class CameraModule(reactContext: ReactApplicationContext) :
        ReactContextBaseJavaModule(reactContext) {

    private var photoPromise: Promise? = null
    private var photoUri: Uri? = null

    companion object {
        const val CAMERA_REQUEST_CODE = 1001
    }

    override fun getName() = "CameraModule"

    init {
        reactContext.addActivityEventListener(
                object : BaseActivityEventListener() {
                    override fun onActivityResult(
                            activity: Activity,
                            requestCode: Int,
                            resultCode: Int,
                            data: Intent?
                    ) {
                        if (requestCode == CAMERA_REQUEST_CODE) {
                            if (resultCode == Activity.RESULT_OK && photoUri != null) {
                                val result =
                                        Arguments.createMap().apply {
                                            putString("uri", photoUri.toString())
                                            putString("fileName", photoUri?.lastPathSegment)
                                        }
                                photoPromise?.resolve(result)
                            } else {
                                photoPromise?.reject(
                                        "CAMERA_CANCELLED",
                                        "Usuario canceló la cámara"
                                )
                            }
                            photoPromise = null
                            photoUri = null
                        }
                    }
                }
        )
    }

    @ReactMethod
    fun takePicture(promise: Promise) {
        val activity = reactApplicationContext.currentActivity
        if (activity == null) {
            promise.reject("NO_ACTIVITY", "No hay actividad disponible")
            return
        }

        try {
            val photoFile = createImageFile()
            photoUri =
                    FileProvider.getUriForFile(
                            reactApplicationContext,
                            "${reactApplicationContext.packageName}.fileprovider",
                            photoFile
                    )

            val intent =
                    Intent(MediaStore.ACTION_IMAGE_CAPTURE).apply {
                        putExtra(MediaStore.EXTRA_OUTPUT, photoUri)
                        addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
                        addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION)
                    }

            photoPromise = promise
            activity.startActivityForResult(intent, CAMERA_REQUEST_CODE)
        } catch (e: Exception) {
            promise.reject("ERROR", e.message ?: "Error desconocido")
        }
    }

    private fun createImageFile(): File {
        val timeStamp = SimpleDateFormat("yyyyMMdd_HHmmss", Locale.US).format(Date())
        val storageDir = reactApplicationContext.getExternalFilesDir(Environment.DIRECTORY_PICTURES)
        return File.createTempFile("TASK_${timeStamp}_", ".jpg", storageDir)
    }
}
