# Ticket Management App

Application de gestion de tickets de support avec un backend Spring Boot et un frontend Nuxt.js.

## Prérequis

- Java 17+
- Maven
- MySQL
- Node.js & npm

## Installation

### 1. Récupérer le projet
```bash
git clone https://github.com/ton-repo/projet.gi
```

### 2. Backend
```bash
cd back
```

#### Configurer les variables locales
```bash
cp src/main/resources/application-local.example.yml \
   src/main/resources/application-local.yml
```

Ouvrez `application-local.yml` et configurer la base de données(MySQL) :

#### Générer la clé JWT
```bash
openssl rand -hex 32
```

> Si cette commande ne fonctionne pas vous pouvez utiliser une autre alternative pour générer le 'secret'

Ajoute la clé générée dans `application-local.yml` :
```yaml
jwt:
  secret: _CLE_GENEREE
  expiration: 86400000
```

#### Créer la base de données MySQL depuis PhpMyAdmin

#### Démarrer le backend
```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

> Spring Boot crée automatiquement les tables au premier démarrage.

---

### 3. Frontend
```bash
cd ../front
npm install
npm run dev -- -o
```

---

## Structure de la configuration

| Fichier | Commité | Rôle |
|---|---|---|
| `application.yml` | ✅ oui | Config de base |
| `application-local.example.yml` | ✅ oui | Modèle à copier |
| `application-local.yml` | ❌ non | Tes vraies valeurs locales |

---

## Ce qui pourrait être amélioré

- Gestion globale des exceptions avec `@RestControllerAdvice`