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
    name: "  الهیاری",
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






// Sample teachers data with their messages
const teachersData = {
    'teacher1': {
        name: 'آقای احمدی',
        messages: [
            {
                date: '1403/08/15',
                content: 'والدین گرامی، لطفاً برای جلسه والدین در روز پنج‌شنبه ساعت 3 عصر در مدرسه حضور یابید. موضوع جلسه بررسی پیشرفت تحصیلی فرزندتان خواهد بود.'
            },
            {
                date: '1403/08/10',
                content: 'فرزند شما در امتحان ریاضی نمره قابل قبولی کسب کرده است. لطفاً بیشتر روی تمرین‌های خانگی تأکید کنید.'
            },
            {
                date: '1403/08/05',
                content: 'یادآوری: فردا آخرین مهلت تحویل پروژه علوم است. فرزندتان هنوز پروژه خود را تحویل نداده است.'
            }
        ]
    },
    'teacher2': {
        name: 'خانم رضایی',
        messages: [
            {
                date: '1403/08/12',
                content: 'فرزند شما در کلاس زبان انگلیسی پیشرفت خوبی داشته است. لطفاً او را تشویق کنید تا به مطالعه ادامه دهد.'
            },
            {
                date: '1403/08/08',
                content: 'والدین محترم، لطفاً کتاب‌های درسی فرزندتان را بررسی کنید. برخی از کتاب‌ها ناقص یا فراموش شده‌اند.'
            }
        ]
    },
    'teacher3': {
        name: 'آقای محمدی',
        messages: [
            {
                date: '1403/08/14',
                content: 'فرزند شما در درس تاریخ عملکرد بسیار خوبی دارد. او همیشه فعال و مشارکت‌جو است.'
            },
            {
                date: '1403/08/07',
                content: 'توصیه می‌شود فرزندتان بیشتر به کتاب‌خوانی مشغول شود. این کار به تقویت مهارت‌های زبانی او کمک خواهد کرد.'
            },
            {
                date: '1403/08/02',
                content: 'والدین گرامی، فرزندتان در فعالیت‌های گروهی مشارکت کمی دارد. لطفاً با او در این زمینه صحبت کنید.'
            }
        ]
    },
    'teacher4': {
        name: 'خانم صادقی',
        messages: [
            {
                date: '1403/08/13',
                content: 'فرزند شما در درس علوم نمرات عالی کسب کرده است. لطفاً او را تشویق کنید.'
            },
            {
                date: '1403/08/06',
                content: 'یادآوری: اردوی علمی هفته آینده برگزار خواهد شد. لطفاً برگه رضایت را امضا کرده و ارسال کنید.'
            }
        ]
    },
    'teacher5': {
        name: 'آقای کریمی',
        messages: [
            {
                date: '1403/08/11',
                content: 'فرزند شما در درس ورزش بسیار فعال است و روحیه تیمی خوبی دارد.'
            },
            {
                date: '1403/08/04',
                content: 'لطفاً لباس‌های ورزشی مناسب برای فرزندتان تهیه کنید. او نیاز به کفش ورزشی جدید دارد.'
            },
            {
                date: '1403/07/28',
                content: 'والدین محترم، مسابقات ورزشی مدرسه ماه آینده برگزار می‌شود. فرزندتان می‌تواند در رشته دو شرکت کند.'
            }
        ]
    },
    'teacher6': {
        name: 'خانم حسینی',
        messages: [
            {
                date: '1403/08/09',
                content: 'فرزند شما در هنرهای تجسمی استعداد فوق‌العاده‌ای دارد. توصیه می‌شود در کلاس‌های فوق‌برنامه شرکت کند.'
            },
            {
                date: '1403/08/03',
                content: 'لطفاً لوازم نقاشی کامل برای فرزندتان تهیه کنید. فهرست لوازم را از دفتر مدرسه دریافت کنید.'
            }
        ]
    },
    'teacher7': {
        name: 'آقای نوری',
        messages: [
            {
                date: '1403/08/16',
                content: 'فرزند شما در درس کامپیوتر پیشرفت چشمگیری داشته است. او با نرم‌افزارهای جدید به خوبی کار می‌کند.'
            }
        ]
    },
    'teacher8': {
        name: 'خانم طاهری',
        messages: [
            {
                date: '1403/08/01',
                content: 'والدین محترم، فرزندتان در درس موسیقی بسیار خلاق است. پیشنهاد می‌شود در کلاس‌های آموزش ساز شرکت کند.'
            },
            {
                date: '1403/07/25',
                content: 'کنسرت مدرسه ماه آینده برگزار خواهد شد. فرزندتان برای شرکت در گروه کر انتخاب شده است.'
            }
        ]
    }
};

// DOM elements
const teachersTableBody = document.getElementById('teachersTableBody');
const messagesSection = document.getElementById('messagesSection');
const selectedTeacherName = document.getElementById('selectedTeacherName');
const messagesList = document.getElementById('messagesList');
const closeMessagesBtn = document.getElementById('closeMessages');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadTeachers();
    setupEventListeners();
});

// Load teachers into the table
function loadTeachers() {
    teachersTableBody.innerHTML = '';
    
    Object.keys(teachersData).forEach(teacherId => {
        const teacher = teachersData[teacherId];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="teacher-name">${teacher.name}</td>
            <td>
                <button class="view-messages-btn" onclick="showTeacherMessages('${teacherId}')">
                    <i class="fas fa-envelope"></i>
                    مشاهده پیام‌ها
                </button>
            </td>
        `;
        
        // Add click event to the entire row
        row.addEventListener('click', function(e) {
            if (!e.target.classList.contains('view-messages-btn')) {
                showTeacherMessages(teacherId);
            }
        });
        
        teachersTableBody.appendChild(row);
    });
}

// Show messages for a specific teacher
function showTeacherMessages(teacherId) {
    const teacher = teachersData[teacherId];
    if (!teacher) return;
    
    // Update teacher name in header
    selectedTeacherName.textContent = `پیام‌های ${teacher.name}`;
    
    // Clear previous messages
    messagesList.innerHTML = '';
    
    // Check if teacher has messages
    if (!teacher.messages || teacher.messages.length === 0) {
        messagesList.innerHTML = `
            <div class="no-messages">
                <i class="fas fa-inbox"></i>
                <p>هیچ پیامی برای این معلم ثبت نشده است</p>
            </div>
        `;
    } else {
        // Sort messages by date (newest first)
        const sortedMessages = teacher.messages.sort((a, b) => {
            // Convert Persian date to comparable format
            const dateA = a.date.split('/').map(num => parseInt(num));
            const dateB = b.date.split('/').map(num => parseInt(num));
            
            // Compare year, month, day
            for (let i = 0; i < 3; i++) {
                if (dateA[i] !== dateB[i]) {
                    return dateB[i] - dateA[i]; // Descending order
                }
            }
            return 0;
        });
        
        // Display messages
        sortedMessages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message-item';
            messageElement.innerHTML = `
                <div class="message-date">
                    <i class="fas fa-calendar-alt"></i>
                    ${message.date}
                </div>
                <div class="message-content">
                    ${message.content}
                </div>
            `;
            messagesList.appendChild(messageElement);
        });
    }
    
    // Show messages section with animation
    messagesSection.style.display = 'block';
    setTimeout(() => {
        messagesSection.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// Setup event listeners
function setupEventListeners() {
    // Close messages button
    closeMessagesBtn.addEventListener('click', function() {
        messagesSection.style.display = 'none';
        // Scroll back to teachers table
        document.querySelector('.teachers-section').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Close messages when clicking outside
    document.addEventListener('click', function(e) {
        if (messagesSection.style.display === 'block' && 
            !messagesSection.contains(e.target) && 
            !e.target.closest('.teachers-table')) {
            messagesSection.style.display = 'none';
        }
    });
    
    // Keyboard support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && messagesSection.style.display === 'block') {
            messagesSection.style.display = 'none';
        }
    });
}

// Add search functionality (optional enhancement)
function searchTeachers(searchTerm) {
    const rows = teachersTableBody.querySelectorAll('tr');
    rows.forEach(row => {
        const teacherName = row.querySelector('.teacher-name').textContent;
        if (teacherName.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Export functions for global access
window.showTeacherMessages = showTeacherMessages;
window.searchTeachers = searchTeachers;





