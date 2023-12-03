# WS - Ariketa: Userfetch - mongo

## Sarrera

Userfetch ariketaren inplementazioa mongodb erabiliz.

## Build

### Betebeharrak

* *npm*
* *Node.js*

### Nola eraiki

Biltegia klonatu:

```bash
git clone https://github.com/Josu-A/ws-express-mongo.git
cd ws-express-mongo
```

npm dependenziak instalatu:

```bash
npm install
```

Sare aplikazioa hasieratu defektuzko 3103 portuan:

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
DEBUG=userfetch-mongo:* npm start
```

</details>

<details><summary>Windows Command Prompt</summary>

```cmd
set DEBUG=userfetch-mongo:* & npm start
```

</details>

<details><summary>Windows PowerShell</summary>

```ps
$env:DEBUG='userfetch-mongo:*'; npm start
```

</details>
