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
            invalidate() // Redibuja cuando cambia el nombre
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
        
        // Extraer iniciales
        val initials = getInitials(name)
        
        // Generar color basado en el hash del nombre
        val backgroundColor = generateColorFromName(name)
        paint.color = backgroundColor
        
        // Dibujar círculo
        canvas.drawCircle(width / 2f, height / 2f, radius, paint)
        
        // Ajustar tamaño del texto según el tamaño del círculo
        textPaint.textSize = radius * 0.6f
        
        // Dibujar iniciales centradas
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
        // Generar un hash del nombre
        val hash = abs(name.hashCode())
        
        // Colores vibrantes predefinidos
        val colors = arrayOf(
            Color.parseColor("#FF6B6B"), // Rojo
            Color.parseColor("#4ECDC4"), // Turquesa
            Color.parseColor("#45B7D1"), // Azul
            Color.parseColor("#FFA07A"), // Salmón
            Color.parseColor("#98D8C8"), // Verde menta
            Color.parseColor("#F7DC6F"), // Amarillo
            Color.parseColor("#BB8FCE"), // Púrpura
            Color.parseColor("#85C1E2"), // Azul claro
            Color.parseColor("#F8B739"), // Naranja
            Color.parseColor("#52BE80")  // Verde
        )
        
        return colors[hash % colors.size]
    }
    
    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        // Mantener aspecto cuadrado
        val size = minOf(
            MeasureSpec.getSize(widthMeasureSpec),
            MeasureSpec.getSize(heightMeasureSpec)
        )
        setMeasuredDimension(size, size)
    }
}