//console.log('hello world!')

const validator = require('validator');
//console.log(validator.isEmail('harydanto.irvan@gmail.com'));
//console.log(validator.isMobilePhone('082219079290','id-ID'));

const readLine = require('readline');
const fs = require('fs');

//inisialisasi objek readline
const rl=readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

//menampilkan tiga buah pertanyaan (nama,nomor telepon, email)
//lalu menyimpan data-data tersebut ke dalam sebuah berkas .json
rl.question('What is your name? ',(name)=>{
    rl.question('What is your phone number? ',(phoneNum)=>{
        if(!validator.isMobilePhone(phoneNum,'id-ID')){//validasi nomor telepon
            console.log('nomor Salah!');
            rl.close();//jika nomor telepon yang dimasukkan salah, maka hentikan program
        }else{//jika benar, lanjut tanya email
            rl.question('What is your email? ',email=>{
                if(!validator.isEmail(email)){//validasi email
                    console.log('Email salah!');
                    rl.close();//jika email yg dimasukkan salah, hentikan program.
                }else{
                    const contact={name,phoneNum,email};//bungkus ke dalam sebuah objek
                    const file = fs.readFileSync('data/contacts.json','utf8');//baca isi file contacts
                    const contacts = JSON.parse(file);//konversi dari format JSON
                
                    contacts.push(contact);//tambahkan nama,nomor telepon, dan email yang baru saja dibaca dari cmd
                    fs.writeFileSync('data/contacts.json',JSON.stringify(contacts));//tulis data yang baru ke dalam berkas .json
                    console.log('Terimakasih sudah memasukkan data!');//konfirmasi data sudah berhasil ditulis ke file json
                    rl.close();
                }
            }); 
        } 
    })
})