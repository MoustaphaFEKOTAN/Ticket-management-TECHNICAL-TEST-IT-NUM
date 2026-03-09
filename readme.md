# Ticket Management App - MOUSTAPHA FEKOTAN

Application de gestion de tickets de support avec un backend Spring Boot et un frontend Nuxt.js(TEST TECHNIQUE IT-NUM)

## Prérequis

- Java 17+
- Maven
- MySQL
- Node.js & npm(v22.13.1)
- Spring Boot 4.0.3

## Installation

### 1. Récupérer le projet
```bash
git clone https://github.com/MoustaphaFEKOTAN/Ticket-management-TECHNICAL-TEST-IT-NUM
```

#### Dézipper le fichier et ouvrez le projet dans votre éditeur de code 

### 2. Accédez au Backend du projet
```bash
cd back

```

#### 2.1 Configurer les variables locales
```bash
cp src/main/resources/application-local.example.yml \
   src/main/resources/application-local.yml
```


#### 2.2 Créer la base de données MySQL depuis PhpMyAdmin

Ouvrez `application-local.yml` et configurer la base de données(MySQL) :

#### 2.3 Générer la clé JWT DEPUIS VOTRE TERMINAL
```bash
openssl rand -hex 32
```

> Si cette commande ne fonctionne pas vous pouvez utiliser une autre alternative pour générer le 'secret'

Copiez la clé générée et ajoutez la clé générée dans `application-local.yml` :
```yaml
jwt:
  secret: CLE_GENEREE
  expiration: 86400000
```
#### 2.4 Ajoutez l'url du front au niveau de:


#### 2.5 Démarrer le backend
```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

> Spring Boot crée automatiquement les tables au premier démarrage.

---

### 3. Accédez au Frontend du projet
```bash
cd ../front
npm install
```

### 3.1 Une fois toutes les dépendances installées, Configurer les variables locales 

```bash
cp .env.example \ .env 
```
- Rajouter l'url du backend en cours d'execution dans le .env à ce niveau:
  


#### 3.2 Démarrez le serveur
```bash
npm run dev -- -o
```

## Ce qui pourrait être amélioré coté backend

- Gestion globale des exceptions avec `@RestControllerAdvice`
- Pagination sur la liste des tickets pour améliorer les performances qund la liste deviendra trop longue à afficher
- Tests unitaires et fonctionnels
- Ajout d'un role 'Agent' pour permettre l'assignation d'un ticket à un agent de la plateforme
- Documentation complète de l'Api
- Ajout de docker-commpose pour faciliter le déploiement
- Job permettant d'archiver des tickets fermés depuis un certains temps
- Système de notification pour alerter l'admin dès qu'un nouveau ticket est soumis

## Ce qui pourrait être amélioré coté frontend

- 