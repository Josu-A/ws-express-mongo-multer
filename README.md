# WS - Ariketa: Userfetch - mongo - multer

## Sarrera

Userfetch ariketaren inplementazioa `mongodb` eta `multer` erabiliz.

## Build

### Betebeharrak

* *npm*
* *Node.js*

### Nola eraiki

Biltegia klonatu:

```bash
git clone https://github.com/Josu-A/ws-express-mongo-multer.git
cd ws-express-mongo-multer
```

npm dependenziak instalatu:

```bash
npm install
```

Sare aplikazioa hasieratu defektuzko 3104 portuan:

```bash
npm start
```

### Portu zehatzean hasieratu

Portu zehatz batean hasieratzeko, x portu zenbakia izanik:

<details><summary>Linux / MacOS</summary>

```bash
PORT=x npm start
```

</details>

<details><summary>Windows Command Prompt</summary>

```cmd
set PORT=x & npm start
```

</details>

<details><summary>Windows PowerShell</summary>

```ps
$env:PORT='x'; npm start
```

</details>

### Debuging moduan hasieratu

Aplikazioak debug mezuak kontsolan idazteko

<details><summary>Linux / MacOS</summary>

```bash
DEBUG=userfetch-mongo-multer:* npm start
```

</details>

<details><summary>Windows Command Prompt</summary>

```cmd
set DEBUG=userfetch-mongo-multer:* & npm start
```

</details>

<details><summary>Windows PowerShell</summary>

```ps
$env:DEBUG='userfetch-mongo-multer:*'; npm start
```

</details>
