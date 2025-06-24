# Projet Individuel : Formulaire React Fullstack CI/CD

## Description du projet

Ce projet est une application fullstack permettant de gérer des utilisateurs via un formulaire React connecté à une base de données MySQL.  
L'architecture repose sur Docker (MySQL, Adminer, API Python/FastAPI, Frontend React).  
Les utilisateurs peuvent s'inscrire via le formulaire, la liste des utilisateurs (informations réduites) est affichée, et un compte admin permet de supprimer un utilisateur et de voir ses informations privées.

La CI/CD est assurée par GitHub Actions :

- Tests unitaires et d'intégration avec rapport de couverture sur Codecov
- Tests end-to-end Cypress
- Déploiement automatique du front sur GitHub Pages et du back sur Vercel
- La base de données de production est hébergée sur Alwaysdata

---

## Liens du projet

- **Repo GitHub** : [https://github.com/NawfelHilal/ci_cd_react_form](https://github.com/NawfelHilal/ci_cd_react_form)
- **Démo Frontend (GitHub Pages)** : [https://nawfelhilal.github.io/ci_cd_react_form/](https://nawfelhilal.github.io/ci_cd_react_form/)
- **Démo Backend (Vercel)** : [https://ci-cd-react-form.vercel.app/](https://ci-cd-react-form.vercel.app/) <!-- À adapter selon ton déploiement -->
- **Rapport de couverture Codecov** : [https://codecov.io/gh/NawfelHilal/ci_cd_react_form](https://codecov.io/gh/NawfelHilal/ci_cd_react_form)

---

## Architecture Docker

L'architecture Docker comprend :

- **MySQL** (base de données)
- **Adminer** (interface d'administration de la BDD)
- **API Python/FastAPI** (backend)
- **React** (frontend)

---

## Fonctionnalités principales

- **Formulaire React** avec validation (nom, prénom, email, date de naissance, ville, code postal)
- **Sauvegarde en base MySQL** (plus de localStorage)
- **Affichage de la liste des utilisateurs** (infos réduites)

---

## CI/CD & Tests

- **Tests unitaires et d'intégration** (Jest, React Testing Library)
- **Tests end-to-end** (Cypress)
- **Rapport de couverture** (Codecov)
- **Pipeline GitHub Actions** :
  - Lancement des tests unitaires et d'intégration
  - Lancement des tests e2e Cypress (via Docker)
  - Déploiement automatique du front (GitHub Pages) et du back (Vercel)
  - Utilisation de la base de données de production sur Alwaysdata

---

## Déploiement

- **Frontend** : GitHub Pages
- **Backend** : Vercel
- **BDD de production** : Alwaysdata

---

## Pour la notation

- **Architecture Docker fonctionnelle (mysql / python / adminer / react)** : / 6 pts
- **Tests unitaires et intégration + couverture Codecov** : / 6 pts
- **Tests e2e Cypress** : / 6 pts
- **Pipeline GitHub Actions (tests + déploiement front/back + BDD prod)** : / 2 pts

---

## Pour rendre le projet

Fournir un fichier `.txt` contenant :

- Le lien du repo GitHub
- Le lien Vercel (backend)
- Le lien GitHub Pages (frontend)
- Le lien Codecov

---

## Installation locale

```bash
git clone https://github.com/NawfelHilal/ci_cd_react_form.git
npm install
```

- Frontend : http://localhost:3000
- Backend : http://localhost:8000
- Adminer : http://localhost:8081 (login avec root/ynovpwd)
- MySQL : localhost:3306

---

## Contact

Nawfel Hilal  
[https://github.com/NawfelHilal](https://github.com/NawfelHilal)
