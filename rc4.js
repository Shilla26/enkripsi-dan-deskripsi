var RC4 = {
    generateKeyStream: function(key, length) {
  
        var S = [];
        for (var i = 0; i < 256; i++) {
            S[i] = i;
        }
  
  
        var j = 0;
        for (var i = 0; i < 256; i++) {
            j = (j + S[i] + key.charCodeAt(i % key.length)) % 256;
  
            var temp = S[i];
            S[i] = S[j];
            S[j] = temp;
        }
  
  
        var keyStream = [];
        i = 0;
        j = 0;
        for (var k = 0; k < length; k++) {
            i = (i + 1) % 256;
            j = (j + S[i]) % 256;
  
            var temp = S[i];
            S[i] = S[j];
            S[j] = temp;
  
  
            var keyByte = S[(S[i] + S[j]) % 256];
            keyStream.push(keyByte);
        }
  
        return keyStream;
    },
  
    encrypt: function(plaintext, key) {
        var keyStream = this.generateKeyStream(key, plaintext.length);
        var ciphertext = '';
  
        for (var i = 0; i < plaintext.length; i++) {
  
            var cipherByte = plaintext.charCodeAt(i) ^ keyStream[i];
  
            ciphertext += ('00' + cipherByte.toString(16)).slice(-2);
        }
  
        return ciphertext;
    },
  
    decrypt: function(ciphertext, key) {
        var keyStream = this.generateKeyStream(key, ciphertext.length / 2);
        var plaintext = '';
  
        for (var i = 0; i < ciphertext.length; i += 2) {
  
            var cipherByte = parseInt(ciphertext.substring(i, i + 2), 16);
            var plainByte = cipherByte ^ keyStream[i / 2];
            plaintext += String.fromCharCode(plainByte);
        }
  
        return plaintext;
    }
  };