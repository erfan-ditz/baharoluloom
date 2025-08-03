// Simple Login
function showLogin() {
  const notification = document.createElement("div")
  notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 1.5rem;
        color: #2d3748;
        font-size: 0.9rem;
        font-weight: 600;
        z-index: 2000;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        text-align: center;
        min-width: 200px;
        animation: fadeIn 0.3s ease-out;
    `

  notification.innerHTML = `
        <div style="font-size: 1.5rem; margin-bottom: 0.8rem;">🚀</div>
        <div style="margin-bottom: 0.3rem;">در حال انتقال...</div>
        <div style="font-size: 0.7rem; opacity: 0.7;">لطفاً صبر کنید</div>
    `

  const style = document.createElement("style")
  style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translate(-50%, -60%) scale(0.9); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
    `
  document.head.appendChild(style)
  document.body.appendChild(notification)

  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification)
      document.head.removeChild(style)
    }
  }, 1800)
}

// Login Message
function showLoginMessage() {
  const notification = document.createElement("div")
  notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 15px;
        padding: 2rem;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        z-index: 3000;
        text-align: center;
        min-width: 300px;
        animation: slideIn 0.3s ease-out;
    `

  notification.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">🚀</div>
        <h3 style="color: #1e3a8a; margin-bottom: 1rem; font-weight: 700;">در حال انتقال به سامانه</h3>
        <p style="color: #64748b; margin-bottom: 1.5rem;">لطفاً صبر کنید...</p>
        <div style="width: 100%; height: 4px; background: #f1f5f9; border-radius: 2px; overflow: hidden;">
            <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #1e3a8a, #1e40af); border-radius: 2px; animation: progress 2s ease-out;"></div>
        </div>
    `

  const style = document.createElement("style")
  style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translate(-50%, -60%) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
        @keyframes progress {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
        }
    `

  document.head.appendChild(style)
  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideIn 0.3s ease-out reverse"
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
        document.head.removeChild(style)
      }
    }, 300)
  }, 2500)
}

// Auto Slider
let currentSlide = 0
let slideInterval
const slides = document.querySelectorAll(".slide")

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active")
    if (i === index) {
      slide.classList.add("active")
    }
  })
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length
  showSlide(currentSlide)
}

function startSlider() {
  slideInterval = setInterval(nextSlide, 2000) // 4 seconds
}

// Resume Modal Functions
function openResumeModal() {
  const modal = document.getElementById("resumeModal")
  modal.classList.add("show")
  document.body.style.overflow = "hidden"
}

function closeResumeModal() {
  const modal = document.getElementById("resumeModal")
  modal.classList.remove("show")
  document.body.style.overflow = "auto"
}

// Resume Form Submit
function submitResume(event) {
  event.preventDefault()

  const submitBtn = event.target.querySelector(".submit-btn")
  const btnText = submitBtn.querySelector(".btn-text")
  const formData = new FormData(event.target)

  // Disable button and show loading
  submitBtn.disabled = true
  submitBtn.classList.add("loading")
  btnText.textContent = "در حال ارسال"

  // Simulate form submission
  setTimeout(() => {
    const name = formData.get("fullName")

    // Show success message
    showSuccessMessage(name)

    // Reset form
    event.target.reset()
    submitBtn.disabled = false
    submitBtn.classList.remove("loading")
    btnText.textContent = "ارسال رزومه"

    // Close modal
    closeResumeModal()
  }, 2000)
}

function showSuccessMessage(name) {
  const successModal = document.createElement("div")
  successModal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    z-index: 3000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease-out;
  `

  successModal.innerHTML = `
    <div style="
      background: white;
      border-radius: 20px;
      padding: 3rem;
      text-align: center;
      max-width: 500px;
      width: 90vw;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      animation: slideUp 0.3s ease-out;
    ">
      <div style="font-size: 4rem; margin-bottom: 1.5rem;">✅</div>
      <h3 style="color: #10b981; font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem;">
        رزومه با موفقیت ارسال شد!
      </h3>
      <p style="color: #64748b; margin-bottom: 1rem; line-height: 1.6;">
        سلام <strong>${name}</strong>،<br>
        رزومه شما دریافت شد.
      </p>
      <p style="color: #64748b; margin-bottom: 2rem; line-height: 1.6;">
        کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.
      </p>
      <button onclick="this.parentElement.parentElement.remove()" style="
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        border: none;
        padding: 0.75rem 2rem;
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
        متوجه شدم
      </button>
    </div>
  `

  const successStyle = document.createElement("style")
  successStyle.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px) scale(0.9);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  `

  document.head.appendChild(successStyle)
  document.body.appendChild(successModal)

  // Auto remove after 8 seconds
  setTimeout(() => {
    if (document.body.contains(successModal)) {
      successModal.remove()
      successStyle.remove()
    }
  }, 8000)
}

// Phone number formatting
function formatPhoneNumber(input) {
  let value = input.value.replace(/[^\d]/g, "")

  if (value.length > 0 && !value.startsWith("09")) {
    if (value.startsWith("9")) {
      value = "0" + value
    } else if (!value.startsWith("0")) {
      value = "09" + value
    }
  }

  if (value.length > 11) {
    value = value.substring(0, 11)
  }

  input.value = value
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  // Start slider
  if (slides.length > 0) {
    showSlide(0)
    startSlider()
  }

  // Add phone formatting
  const phoneInput = document.querySelector('input[name="phone"]')
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      formatPhoneNumber(this)
    })
  }

  // Close modal on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeResumeModal()
    }
  })

  // Close modal on backdrop click
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      closeResumeModal()
    }
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})

// Cleanup on page unload
window.addEventListener("beforeunload", () => {
  if (slideInterval) {
    clearInterval(slideInterval)
  }
})







// اطلاعات اساتید
const teachersData = {
  teacher1: {
    name: "طهمورثی",
    subject: "مدرس دروس عمومی",
    experience: "  30 سال سابقه تدریس",
    education: "   کارشناسی",
    bio: "دارای سابقه معاونت آموزشی و تربیتی "
  },
  teacher2: {
    name: " صادقی",
    subject: "مدرس ریاضی و فیزیک و شیمی",
    experience: "30 سال سابقه تدریس",
    education: "  کارشناسی ارشد برق ",
    bio: "سابقه تدریس در دانشگاه و دروس ریاضی محض"
  },
  teacher3: {
    name: " رضایی",
    subject: "مدرس رشته شبکه و نرم‌افزار",
    experience: "5 سال سابقه تدریس",
    education: "کارشناسی IT  ",
    bio: "دارای سابقه تدریس آموزشگاهی - خصوصی - هنرستان - دانشگاه"
  },
  teacher4: {
    name: " ابراهیم زاده",
    subject: "مدرس رشته شبکه و نرم‌افزار",
    experience: "5 سال سابقه تدریس",
    education: "کارشناسی ارشد  IT",
    bio: "جزو رتبه های برتر کنکور کارشناسی - فارق التحصیل از دانشگاه شمسی پور"
  },
  teacher5: {
    name: "  ایمانی",
    subject: "مدرس رشته نقشه کشی",
    experience: "4 سال سابقه تدریس",
    education: "کارشناسی ارشد  نقشه کشی",
    bio: "دارای تدریس در زمینه خصوصی و مدارس"
  },
  teacher6: {
    name: "  غلامی",
    subject: "مدرس مکانیک خودرو",
    experience: "2 سال سابقه تدریس",
    education: "کارشناسی   مکانیک",
    bio: "تدریس در زمینه اتو مکانیک و مدارس و آموزشگاه"
  },
  teacher7: {
    name: "  اللّه یاری",
    subject: "مدرس زبان انگلیسی",
    experience: "3 سال سابقه تدریس",
    education: "کارشناسی   زبان انگلیسی",
    bio: "تدریس مدارس و آموزشگاه "
  },
  teacher8: {
    name: "  محمد نژاد",
    subject: "مدرس زبان عربی",
    experience: "30 سال سابقه تدریس",
    education: "کارشناسی   زبان عربی",
    bio: "جز اساتید مجرب و برتر دروس عربی"
  }
};






// نمایش مودال استاد
function showTeacherModal(teacherId) {
  const teacher = teachersData[teacherId];
  const modal = document.getElementById('teacherModal');
  const modalContent = document.getElementById('teacherModalContent');

  modalContent.innerHTML = `
      <h3>${teacher.name}</h3>
      <p class="teacher-info"><strong>رشته:</strong> ${teacher.subject}</p>
      <p class="teacher-info"><strong>سابقه تدریس:</strong> ${teacher.experience}</p>
      <p class="teacher-info"><strong>مدرک تحصیلی:</strong> ${teacher.education}</p>
      <div class="teacher-bio">
          <h4>درباره استاد</h4>
          <p>${teacher.bio}</p>
      </div>
  `;

  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

// پنهان کردن مودال استاد
function hideTeacherModal() {
  const modal = document.getElementById('teacherModal');
  modal.classList.remove('show');
  document.body.style.overflow = 'auto';
}

// بستن مودال با کلید ESC
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    hideTeacherModal();
  }
});



