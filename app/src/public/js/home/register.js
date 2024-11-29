"use strict";

const name = document.querySelector("#name");
const id = document.querySelector("#id");
const psword = document.querySelector("#psword");
const confirmPsword = document.querySelector("#confirm-psword");
const registerBtn = document.querySelector("#btn");

function register() {
  if (!id.value) return alert("아이디를 입력해주세요");
  if (psword.value !== confirmPsword.value) {
    return alert("비밀번호가 일치하지 않습니다");
  }

  const req = {
    name: name.value,
    id: id.value,
    psword: psword.value,
  };

  fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = "/login";
      } else {
        if (res.err) return alert(res.err);
        alert(res.message);
      }
    })
    .catch((err) => {
      console.log(new Error("회원가입 중 에러 발생"));
    });
}

registerBtn.addEventListener("click", register);
