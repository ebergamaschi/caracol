const m = document.getElementById("menu");
document.getElementById("burger").onclick = () => m.classList.toggle("open");
function setLang(l) {
    localStorage.setItem("lang", l);
    document
        .querySelectorAll("[data-it]")
        .forEach((e) => (e.textContent = e.getAttribute(l === "it" ? "data-it" : "data-en")));
}
setLang(localStorage.getItem("lang") || "it");
gsap.registerPlugin(ScrollTrigger);
document
    .querySelectorAll(".panel h2,.panel p,.cards article,.img")
    .forEach((el) =>
        gsap.from(el, { opacity: 0, y: 50, duration: 1, scrollTrigger: { trigger: el, start: "top 85%" } })
    );
const c = document.getElementById("network"),
    x = c.getContext("2d");
function r() {
    c.width = innerWidth;
    c.height = innerHeight;
}
r();
onresize = r;
const pts = [...Array(55)].map(() => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
}));
function anim() {
    x.clearRect(0, 0, c.width, c.height);
    for (let p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > c.width) p.vx *= -1;
        if (p.y < 0 || p.y > c.height) p.vy *= -1;
        x.fillStyle = "rgba(150,255,190,.5)";
        x.beginPath();
        x.arc(p.x, p.y, 2, 0, 6.28);
        x.fill();
        for (let q of pts) {
            let d = Math.hypot(p.x - q.x, p.y - q.y);
            if (d < 180) {
                x.strokeStyle = "rgba(120,220,255," + (1 - d / 180) * 0.12 + ")";
                x.beginPath();
                x.moveTo(p.x, p.y);
                x.lineTo(q.x, q.y);
                x.stroke();
            }
        }
    }
    requestAnimationFrame(anim);
}
anim();

emailjs.init({
    publicKey: "YOUR_PUBLIC_KEY",
});

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const message = document.getElementById("message").value.trim();

    if (name.length < 2) {
        status.innerHTML = "Please enter a valid name";

        return;
    }

    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
        status.innerHTML = "Please enter a valid email";

        return;
    }

    if (message.length < 10) {
        status.innerHTML = "Message too short";

        return;
    }

    status.innerHTML = "Sending...";

    emailjs
        .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
            from_name: name,
            from_email: email,
            message: message,
        })
        .then(function () {
            status.innerHTML = "Message sent successfully.";

            form.reset();
        })
        .catch(function (error) {
            console.error(error);

            status.innerHTML = "Unable to send message.";
        });
});
