# Formulaire React avec CI/CD

Ce projet est un formulaire React avec validation côté client et intégration continue/déploiement continu (CI/CD). Il utilise GitHub Actions pour automatiser les tests, la couverture de code et le déploiement sur GitHub Pages.

![Badge GitHub Actions](https://github.com/NawfelHilal/ci_cd_react_form/actions/workflows/build_test_deploy_react.yml/badge.svg)
[![codecov](https://codecov.io/gh/NawfelHilal/ci_cd_react_form/branch/main/graph/badge.svg)](https://codecov.io/gh/NawfelHilal/ci_cd_react_form)

## Caractéristiques

- Formulaire avec validation en temps réel et soumission sécurisée
- Interface utilisateur élégante avec Material UI
- Couverture de test à 100%
- Documentation générée automatiquement avec JSDoc
- Déploiement continu vers GitHub Pages

## Démonstration

Vous pouvez voir l'application en action ici : [https://nawfelhilal.github.io/ci_cd_react_form/](https://nawfelhilal.github.io/ci_cd_react_form/)

## Validation du formulaire

Le formulaire implémente les validations suivantes :

- Champs Nom et Prénom : lettres, accents, espaces et tirets uniquement
- Email : format email standard
- Date de naissance : âge minimum de 18 ans
- Ville : lettres, accents, espaces et tirets uniquement
- Code postal : format français (5 chiffres)

## Architecture de CI/CD

Ce projet utilise GitHub Actions pour automatiser :

1. La construction de l'application
2. L'exécution des tests unitaires
3. La mesure de la couverture de code
4. La génération de documentation
5. Le déploiement sur GitHub Pages

Le workflow est déclenché à chaque push ou pull request sur la branche main.

## Installation et utilisation

### Prérequis

- Node.js 18+ et npm

### Installation

```bash
git clone https://github.com/NawfelHilal/ci_cd_react_form.git
cd ci_cd_react_form/react-form
npm install
```
