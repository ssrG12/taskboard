package com.taskdashboard

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.view.View
import kotlin.math.abs

class AvatarView(context: Context) : View(context) {

    private val paint = Paint(Paint.ANTI_ALIAS_FLAG)
    private val textPaint = Paint(Paint.ANTI_ALIAS_FLAG)

    var name: String = ""
        set(value) {
            field = value
            invalidate()
        }

    init {
        textPaint.textAlign = Paint.Align.CENTER
        textPaint.color = Color.WHITE
        textPaint.textSize = 48f
    }

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)

        val width = width.toFloat()
        val height = height.toFloat()
        val radius = minOf(width, height) / 2f

        val initials = getInitials(name)

        val backgroundColor = generateColorFromName(name)
        paint.color = backgroundColor

        canvas.drawCircle(width / 2f, height / 2f, radius, paint)

        textPaint.textSize = radius * 0.6f

        val textY = (height / 2f) - ((textPaint.descent() + textPaint.ascent()) / 2f)
        canvas.drawText(initials, width / 2f, textY, textPaint)
    }

    private fun getInitials(name: String): String {
        if (name.isEmpty()) return "?"

        val parts = name.trim().split(" ").filter { it.isNotEmpty() }

        return when {
            parts.isEmpty() -> "?"
            parts.size == 1 -> parts[0].take(2).uppercase()
            else -> "${parts[0].first()}${parts.last().first()}".uppercase()
        }
    }

    private fun generateColorFromName(name: String): Int {
        val hash = abs(name.hashCode())

        val colors =
                arrayOf(
                        Color.parseColor("#FF6B6B"),
                        Color.parseColor("#4ECDC4"),
                        Color.parseColor("#45B7D1"),
                        Color.parseColor("#FFA07A"),
                        Color.parseColor("#98D8C8"),
                        Color.parseColor("#F7DC6F"),
                        Color.parseColor("#BB8FCE"),
                        Color.parseColor("#85C1E2"),
                        Color.parseColor("#F8B739"),
                        Color.parseColor("#52BE80")
                )

        return colors[hash % colors.size]
    }

    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        val size =
                minOf(MeasureSpec.getSize(widthMeasureSpec), MeasureSpec.getSize(heightMeasureSpec))
        setMeasuredDimension(size, size)
    }
}
