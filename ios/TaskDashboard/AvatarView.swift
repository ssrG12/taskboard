import UIKit

@objc(AvatarView)
class AvatarView: UIView {

  @objc var name: String = "" {
    didSet {
      setNeedsDisplay()
    }
  }

  override func draw(_ rect: CGRect) {
    super.draw(rect)

    guard let context = UIGraphicsGetCurrentContext() else { return }

    let radius = min(rect.width, rect.height) / 2
    let center = CGPoint(x: rect.width / 2, y: rect.height / 2)

    let initials = getInitials(from: name)

    let backgroundColor = generateColor(from: name)

    context.setFillColor(backgroundColor.cgColor)
    context.fillEllipse(
      in: CGRect(
        x: center.x - radius,
        y: center.y - radius,
        width: radius * 2,
        height: radius * 2
      ))

    let fontSize = radius * 0.6
    let attributes: [NSAttributedString.Key: Any] = [
      .font: UIFont.systemFont(ofSize: fontSize, weight: .medium),
      .foregroundColor: UIColor.white,
    ]

    let textSize = initials.size(withAttributes: attributes)
    let textRect = CGRect(
      x: center.x - textSize.width / 2,
      y: center.y - textSize.height / 2,
      width: textSize.width,
      height: textSize.height
    )

    initials.draw(in: textRect, withAttributes: attributes)
  }

  private func getInitials(from name: String) -> String {
    let trimmed = name.trimmingCharacters(in: .whitespaces)
    guard !trimmed.isEmpty else { return "?" }

    let parts = trimmed.split(separator: " ").filter { !$0.isEmpty }

    switch parts.count {
    case 0:
      return "?"
    case 1:
      return String(parts[0].prefix(2)).uppercased()
    default:
      let first = String(parts.first!.prefix(1))
      let last = String(parts.last!.prefix(1))
      return "\(first)\(last)".uppercased()
    }
  }

  private func generateColor(from name: String) -> UIColor {
    let hash = abs(name.hashValue)

    let colors: [UIColor] = [
      UIColor(red: 1.0, green: 0.42, blue: 0.42, alpha: 1.0),  
      UIColor(red: 0.31, green: 0.80, blue: 0.77, alpha: 1.0),  
      UIColor(red: 0.27, green: 0.72, blue: 0.82, alpha: 1.0),  
      UIColor(red: 1.0, green: 0.63, blue: 0.48, alpha: 1.0),  
      UIColor(red: 0.60, green: 0.85, blue: 0.78, alpha: 1.0),   
      UIColor(red: 0.97, green: 0.86, blue: 0.44, alpha: 1.0),  
      UIColor(red: 0.73, green: 0.56, blue: 0.81, alpha: 1.0),  
      UIColor(red: 0.52, green: 0.76, blue: 0.89, alpha: 1.0),   
      UIColor(red: 0.97, green: 0.72, blue: 0.22, alpha: 1.0),  
      UIColor(red: 0.32, green: 0.75, blue: 0.50, alpha: 1.0),  
    ]

    return colors[hash % colors.count]
  }

  override var intrinsicContentSize: CGSize {
    return CGSize(width: 100, height: 100)
  }
}
