
function encrypt() {
  var plaintext = document.getElementById("plaintext").value;
  var key = document.getElementById("key").value;
  var algorithm = document.getElementById("algorithm").value;

  if (plaintext && key) {
      var ciphertext;
      if (algorithm === "rc4") {
          ciphertext = RC4.encrypt(plaintext, key);
      } else if (algorithm === "aes") {
          if (key.length < 16) {
              alert("Panjang key AES harus minimal 16 karakter");
              return;
          }
          ciphertext = CryptoJS.AES.encrypt(plaintext, key).toString();
      }
      document.getElementById("ciphertext").value = ciphertext;
  } else {
      alert("Please enter plaintext and key.");
  }
}

function decrypt() {
  var ciphertext = document.getElementById("ciphertext").value;
  var key = document.getElementById("key").value;
  var algorithm = document.getElementById("algorithm").value;

  if (ciphertext && key) {
      var plaintext;
      if (algorithm === "rc4") {
          plaintext = RC4.decrypt(ciphertext, key);
      } else if (algorithm === "aes") {
          // Validasi panjang key
          if (key.length < 16) {
              alert("Panjang key AES harus minimal 16 karakter");
              return;
          }
          var decrypted = CryptoJS.AES.decrypt(ciphertext, key);
          plaintext = decrypted.toString(CryptoJS.enc.Utf8);
      }
      document.getElementById("plaintext").value = plaintext;
  } else {
      alert("Please enter ciphertext and key.");
  }
}

// Fungsi untuk membersihkan field teks
function clearFields() {
  document.getElementById("plaintext").value = "";
  document.getElementById("ciphertext").value = "";
  document.getElementById("key").value = "";
}
