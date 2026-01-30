# ProjetAW — Entraide

Application web d'entraide étudiante (projet N7). Permet aux étudiants de consulter des offres, participer à des événements, échanger sur un forum et gérer leur profil (cotisation, paiements).

## Structure du projet

```
ProjetAW/
├── entraide/          # Backend Spring Boot (API REST)
└── frontend/          # Frontend React (TypeScript)
```

## Fonctionnalités principales

- **Authentification** : inscription, connexion, routes protégées, rôle admin
- **Offres** : consultation des offres (emploi, stage, etc.)
- **Forum** : liste des discussions, lecture d’une discussion, création de sujet (utilisateur connecté)
- **Événements** : liste et détail des événements, participants, calendrier (FullCalendar)
- **Profil** : profil utilisateur, historique des paiements, cotisation
- **Paiement** : page paiement, callback après paiement
- **Administration** : liste des inscrits, bannissement / débannissement (réservé aux admins)
- **Établissements** : gestion des établissements et adresses associées

## Stack technique

| Couche   | Technologies |
|----------|--------------|
| Backend  | Java 17, Spring Boot 3.4, Spring Security, Spring Data JPA, MySQL, Resend (email) |
| Frontend | React 19, TypeScript, TailwindCSS, React Router, FullCalendar |


