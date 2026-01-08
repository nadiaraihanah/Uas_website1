// 1. Menu Toggle
var MenuItems = document.getElementById("MenuItems");
MenuItems.style.maxHeight = "0px";

function menutoggle() {
    MenuItems.style.maxHeight = MenuItems.style.maxHeight === "0px" ? "600px" : "0px";
}

// 2. Form Toggle
var LoginForm = document.getElementById("LoginForm");
var RegForm = document.getElementById("RegForm");
var Indicator = document.getElementById("Indicator");

login(); // Default tampilkan login

function register() {
    RegForm.style.transform = "translateX(0)";
    LoginForm.style.transform = "translateX(0)";
    Indicator.style.transform = "translateX(100px)";
}

function login() {
    RegForm.style.transform = "translateX(300px)";
    LoginForm.style.transform = "translateX(300px)";
    Indicator.style.transform = "translateX(0)";
}

// 3. Handle Registration
document.getElementById('RegForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    var username = this.querySelector('input[type="text"]').value;
    var email = this.querySelector('input[type="email"]').value;
    var password = this.querySelector('input[type="password"]').value;
    
    if (!username || !email || !password) {
        alert('Isi semua field!');
        return;
    }
    
    var users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Cek duplikat
    if (users.some(u => u.username === username)) {
        alert('Username sudah ada!');
        return;
    }
    
    // Simpan user baru
    users.push({username, email, password});
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Registrasi berhasil! Login sekarang.');
    this.reset();
    login();
});

// 4. Handle Login
document.getElementById('LoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    var username = this.querySelector('input[type="text"]').value;
    var password = this.querySelector('input[type="password"]').value;
    
    var users = JSON.parse(localStorage.getItem('users')) || [];
    var user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        alert('Login sukses!');
        localStorage.setItem('currentUser', JSON.stringify(user));
        // Redirect ke home
        window.location.href = 'index.html';
    } else {
        alert('Username/password salah!');
    }
    
    this.reset();
});