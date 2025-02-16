package com.linkedinfeatures

import android.content.Intent
import android.graphics.drawable.GradientDrawable
import android.net.Uri
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.Gravity
import android.widget.Button
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.ProgressBar
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.cardview.widget.CardView
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.core.DeviceEventManagerModule

class MyKotlinActivity : AppCompatActivity() {

    private lateinit var progressBar: ProgressBar
    private var progressStatus = 0
    private val handler = Handler(Looper.getMainLooper())

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        createInteractiveUI()
    }

    private fun createInteractiveUI() {
        val layout = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER
            setPadding(32, 64, 32, 32)
            background = createGradientBackground()
        }

        val headerText = TextView(this).apply {
            text = "🚀 Native Android Skills Demo 📱"
            textSize = 20f
            setTextColor(ContextCompat.getColor(context, R.color.white))
            gravity = Gravity.CENTER
            setPadding(8, 8, 12, 8)
        }

        val skillCard = createSkillCard()
        val progressCard = createProgressCard()
        val socialLayout = createSocialButtons()

        val backButton = Button(this).apply {
            text = "↩ Return to React Native"
            setBackgroundColor(ContextCompat.getColor(context, R.color.purple_700))
            setTextColor(ContextCompat.getColor(context, R.color.white))
            setPadding(8, 8, 8, 8)
            setOnClickListener {
                sendEventToReactNative("nativeInteraction", "User returned to RN")
                handler.postDelayed({ finish() }, 200)
            }
        }

        layout.addView(headerText)
        layout.addView(skillCard)
        layout.addView(progressCard)
        layout.addView(socialLayout)
        layout.addView(backButton)

        setContentView(layout)
    }

    private fun createGradientBackground(): GradientDrawable {
        return GradientDrawable().apply {
            colors = intArrayOf(
                ContextCompat.getColor(this@MyKotlinActivity, R.color.purple_500),
                ContextCompat.getColor(this@MyKotlinActivity, R.color.purple_700)
            )
            gradientType = GradientDrawable.LINEAR_GRADIENT
            orientation = GradientDrawable.Orientation.TL_BR
            cornerRadius = 32f
        }
    }

    private fun createSkillCard(): CardView {
        return CardView(this).apply {
            radius = 16f
            cardElevation = 8f
            setContentPadding(16, 16, 16, 16)

            val cardContent = LinearLayout(this.context).apply {
                orientation = LinearLayout.VERTICAL
                addView(TextView(context).apply {
                    text = "✅ Demonstrated Skills:"
                    textSize = 18f
                    setTextColor(ContextCompat.getColor(context, R.color.black))
                    setPadding(8, 8, 8, 8)
                })
                addView(createSkillItem("📱 Native UI Components"))
                addView(createSkillItem("🎨 Custom Animations"))
                addView(createSkillItem("🤖 Background Services"))
                addView(createSkillItem("🔗 React Native Integration"))
            }

            addView(cardContent)
        }
    }

    private fun createSkillItem(text: String): TextView {
        return TextView(this).apply {
            this.text = text
            textSize = 16f
            setCompoundDrawablesWithIntrinsicBounds(0, 0, R.drawable.ic_touch, 0)
            compoundDrawablePadding = 16
            setTextColor(ContextCompat.getColor(context, R.color.black))
            setPadding(8, 8, 8, 8)
            setOnClickListener {
                Toast.makeText(context, "You tapped: $text", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun createProgressCard(): CardView {
        return CardView(this).apply {
            radius = 16f
            cardElevation = 8f
            setContentPadding(16, 16, 16, 16)

            val progressLayout = LinearLayout(context).apply {
                orientation = LinearLayout.VERTICAL
                addView(TextView(context).apply {
                    text = "📈 Native Progress Demo:"
                    textSize = 18f
                    setTextColor(ContextCompat.getColor(context, R.color.black))
                    setPadding(8, 8, 8, 8)
                })

                progressBar = ProgressBar(context, null, android.R.attr.progressBarStyleHorizontal).apply {
                    layoutParams = LinearLayout.LayoutParams(
                        LinearLayout.LayoutParams.MATCH_PARENT,
                        32
                    )
                }

                val progressButton = Button(context).apply {
                    text = "Start Progress Demo"
                    setOnClickListener {
                        startProgressAnimation()
                        sendEventToReactNative("progressStarted", "Native progress initiated")
                    }
                }

                addView(progressBar)
                addView(progressButton)
            }

            addView(progressLayout)
        }
    }

    private fun startProgressAnimation() {
        progressStatus = 0
        Thread(Runnable {
            while (progressStatus < 100) {
                progressStatus += 2
                handler.post {
                    progressBar.progress = progressStatus
                    if (progressStatus >= 100) {
                        Toast.makeText(this, "Native task completed!", Toast.LENGTH_SHORT).show()
                        sendEventToReactNative("progressComplete", "Progress reached 100%")
                    }
                }
                try {
                    Thread.sleep(50)
                } catch (e: InterruptedException) {
                    e.printStackTrace()
                }
            }
        }).start()
    }

    private fun createSocialButtons(): LinearLayout {
        return LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.CENTER

            addView(createSocialButton(R.drawable.ic_linkedin, "View LinkedIn Profile").apply {
                setOnClickListener {
                    openUrlInBrowser("https://linkedin.com/in/yourprofile")
                }
            })

            addView(createSocialButton(R.drawable.ic_github, "Check GitHub").apply {
                setOnClickListener {
                    openUrlInBrowser("https://github.com/yourprofile")
                }
            })
        }
    }

    private fun createSocialButton(iconRes: Int, contentDescription: String): ImageView {
        return ImageView(this).apply {
            setImageResource(iconRes)
            this.contentDescription = contentDescription
            layoutParams = LinearLayout.LayoutParams(96, 96).apply {
                marginEnd = 16
            }
            background = ContextCompat.getDrawable(context, R.drawable.social_button_bg)
        }
    }

    private fun openUrlInBrowser(url: String) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
            startActivity(intent)
            sendEventToReactNative("externalLinkOpened", "Opened: $url")
        } catch (e: Exception) {
            runOnUiThread {
                Toast.makeText(this, "No browser installed!", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun sendEventToReactNative(eventName: String, payload: String) {
        (application as? ReactContext)?.let { reactContext ->
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                ?.emit(eventName, payload)
        }
    }
}