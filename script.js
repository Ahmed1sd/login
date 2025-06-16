    let isLogin = true;
const title = document.getElementById("formTitle");
const toggleForm = document.getElementById("toggleForm");
const toggleText = document.getElementById("toggleText");
const btn = document.getElementById("submitBtn");
const msg = document.getElementById("message");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

// تبديل بين تسجيل الدخول وإنشاء الحساب
toggleForm.onclick = () => {
  isLogin = !isLogin;
  title.textContent = isLogin ? "تسجيل الدخول" : "إنشاء حساب";
  btn.textContent = isLogin ? "دخول" : "إنشاء";
  toggleText.innerHTML = isLogin
    ? 'ليس لديك حساب؟ <span id="toggleForm">إنشاء حساب</span>'
    : 'هل لديك حساب؟ <span id="toggleForm">تسجيل الدخول</span>';
  document.getElementById("toggleForm").onclick = toggleForm.onclick;
  msg.textContent = "";
};

// عند الضغط على الزر
btn.onclick = () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    msg.textContent = "يرجى إدخال جميع البيانات.";
    return;
  }

  if (isLogin) {
    const storedUser = JSON.parse(localStorage.getItem(username));
    if (storedUser && storedUser.password === password) {
      localStorage.setItem("loggedInUser", username);
      window.location.href = "home.html"; // تحويل إلى الصفحة الرئيسية
    } else {
      msg.textContent = "بيانات غير صحيحة.";
    }
  } else {
    if (localStorage.getItem(username)) {
      msg.textContent = "اسم المستخدم موجود بالفعل.";
    } else {
      localStorage.setItem(username, JSON.stringify({ password }));
      msg.textContent = "تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن.";
      toggleForm.onclick(); // يرجع لنموذج تسجيل الدخول
    }
  }
};

// التحقق من وجود مستخدم مسجل
window.onload = () => {
  const user = localStorage.getItem("loggedInUser");
  if (user) {
    window.location.href = "home.html"; // تحويل تلقائي إذا مسجل
  }
};