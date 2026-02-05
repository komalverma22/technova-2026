#include <iostream>
#include <string>
#include <cctype>
using namespace std;

const int MOD = 26;

// Function to get key matrix from user
void getKeyMatrix(int keyMatrix[2][2]) {
    cout << "Enter 2x2 key matrix:\n";
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            cout << "keyMatrix[" << i << "][" << j << "]: ";
            cin >> keyMatrix[i][j];
        }
    }
    
    cout << "\nKey Matrix:\n";
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            cout << keyMatrix[i][j] << " ";
        }
        cout << "\n";
    }
}

// Function to encrypt plaintext
void encrypt(string plaintext, int keyMatrix[2][2], string &ciphertext) {
    // Remove spaces and convert to uppercase
    string text = "";
    for (int i = 0; i < plaintext.length(); i++) {
        if (isalpha(plaintext[i])) {
            text += toupper(plaintext[i]);
        }
    }
    
    // Pad with X if odd length
    if (text.length() % 2 != 0) {
        text += 'X';
    }
    
    ciphertext = "";
    
    // Process plaintext in pairs
    for (int i = 0; i < text.length(); i += 2) {
        int p1 = text[i] - 'A';
        int p2 = text[i + 1] - 'A';
        
        // Encryption: C = K * P (mod 26)
        int c1 = (keyMatrix[0][0] * p1 + keyMatrix[0][1] * p2) % MOD;
        int c2 = (keyMatrix[1][0] * p1 + keyMatrix[1][1] * p2) % MOD;
        
        if (c1 < 0) c1 += MOD;
        if (c2 < 0) c2 += MOD;
        
        ciphertext += (char)('A' + c1);
        ciphertext += (char)('A' + c2);
    }
}

// Function to decrypt ciphertext
void hillCypher(string ciphertext, int keyMatrix[2][2], string &plaintext) {
    // Calculate determinant
    int det = (keyMatrix[0][0] * keyMatrix[1][1] - keyMatrix[0][1] * keyMatrix[1][0]) % MOD;
    if (det < 0) det += MOD;
    
    cout << "\nDeterminant (mod 26): " << det << "\n";
    
    // Find modular inverse of determinant
    int detInv = -1;
    for (int i = 1; i < MOD; i++) {
        if ((det * i) % MOD == 1) {
            detInv = i;
            break;
        }
    }
    
    if (detInv == -1) {
        cout << "Error: Key matrix not invertible!\n";
        return;
    }
    
    cout << "Modular Inverse: " << detInv << "\n";
    
    // Create inverse matrix
    int invMatrix[2][2];
    invMatrix[0][0] = (detInv * keyMatrix[1][1]) % MOD;
    invMatrix[0][1] = (detInv * (-keyMatrix[0][1] % MOD + MOD)) % MOD;
    invMatrix[1][0] = (detInv * (-keyMatrix[1][0] % MOD + MOD)) % MOD;
    invMatrix[1][1] = (detInv * keyMatrix[0][0]) % MOD;
    
    cout << "\nInverse Matrix:\n";
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            cout << invMatrix[i][j] << " ";
        }
        cout << "\n";
    }
    
    plaintext = "";
    
    // Process ciphertext in pairs
    for (int i = 0; i < ciphertext.length(); i += 2) {
        int c1 = ciphertext[i] - 'A';
        int c2 = ciphertext[i + 1] - 'A';
        
        // Decryption: P = K^(-1) * C (mod 26)
        int p1 = (invMatrix[0][0] * c1 + invMatrix[0][1] * c2) % MOD;
        int p2 = (invMatrix[1][0] * c1 + invMatrix[1][1] * c2) % MOD;
        
        if (p1 < 0) p1 += MOD;
        if (p2 < 0) p2 += MOD;
        
        plaintext += (char)('A' + p1);
        plaintext += (char)('A' + p2);
    }
}

int main() {
    int keyMatrix[2][2];
    string plaintext, ciphertext, decryptedtext;
    
    cout << "========== HILL CIPHER ==========\n\n";
    
    // Get key matrix
    getKeyMatrix(keyMatrix);
    
    // Get plaintext
    cin.ignore();
    cout << "\nEnter plaintext to encrypt: ";
    getline(cin, plaintext);
    
    // Encrypt
    encrypt(plaintext, keyMatrix, ciphertext);
    
    // Decrypt
    hillCypher(ciphertext, keyMatrix, decryptedtext);
    
    // Display results
    cout << "\n========== RESULTS ==========\n";
    
    string cleantext = "";
    for (int i = 0; i < plaintext.length(); i++) {
        if (isalpha(plaintext[i])) {
            cleantext += toupper(plaintext[i]);
        }
    }
    if (cleantext.length() % 2 != 0) {
        cleantext += 'X';
    }
    
    cout << "Plaintext:   " << cleantext << "\n";
    cout << "Ciphertext:  " << ciphertext << "\n";
    cout << "Decrypted:   " << decryptedtext << "\n";
    
    return 0;
}