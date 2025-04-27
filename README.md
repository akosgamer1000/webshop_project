
# Webshop Backend Dokumentáció

## Áttekintés
Ez a projekt egy webshop backend rendszer, amely NestJS keretrendszerre épül.  
A rendszer kezeli a felhasználókat, a termékeket, a rendeléseket, és további kapcsolódó funkciókat.

## Követelmények
- Node.js (>=18)
- NPM vagy Yarn
- PostgreSQL adatbázis

## Telepítés
```bash
git clone https://github.com/akosgamer1000/webshop_project.git
cd webshop_project
npm install
```

Ezután töltsd ki a `.env` fájlt a megfelelő adatbázis és egyéb beállításokkal.

**Fejlesztői mód indítása:**
```bash
npm run start:dev
```

## Fő funkciók
- Felhasználókezelés (regisztráció, bejelentkezés, jogosultságok)
- Termékkezelés (CRUD műveletek, képfeltöltés)
- Rendeléskezelés (vendég- és regisztrált felhasználó rendelés)
- Keresés és szűrés termékek között
- Admin funkciók jogosultságkezeléssel
- Swagger dokumentáció az API végpontokról

## API Dokumentáció - Swagger
Minden elérhető végpontról részletes leírást és tesztelési lehetőséget kínál a beépített Swagger felület.

**Swagger elérés:**
```
http://localhost:3000/api
```

A Swagger dokumentáció tartalmazza:
- Végpontok URL-jei és HTTP metódusai (GET, POST, PATCH, DELETE)
- Kért és válaszként kapott adatok szerkezete (DTO-k)
- Példa kérések és válaszok
- Hitelesítési igények (Bearer token megadás)

Így közvetlenül a böngészőből kipróbálhatók az API végpontok!

## Környezeti változók (.env példa)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/webshop
JWT_SECRET=valamiTitkosKulcs
JWT_EXPIRES_IN=3600s
```

## Egyéb információk
- Az adatbázis migrációk Prisma ORM segítségével történnek.
- A projekt támogatja a képfeltöltést és azok szerveroldali kezelését.
- Részletes jogosultságkezelés (role-based access control) van implementálva.
