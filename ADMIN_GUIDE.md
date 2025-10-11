# Guide d'accès à l'administration Atlas Dream

## Accès à l'interface d'administration

### En développement local

1. **Démarrez le serveur de développement** :
   ```bash
   npm run dev
   ```

2. **Accédez à l'interface admin** :
   Ouvrez votre navigateur et allez sur :
   ```
   http://localhost:3000/admin
   ```

### Première connexion

Lors de votre première visite sur `/admin`, Payload CMS vous demandera de créer un compte administrateur.

**Étapes** :
1. Remplissez le formulaire de création de compte :
   - **Email** : Votre adresse email (ex: admin@atlasdream.com)
   - **Password** : Choisissez un mot de passe sécurisé (minimum 8 caractères)
   - **Confirm Password** : Confirmez votre mot de passe

2. Cliquez sur "Create First User"

3. Vous serez automatiquement connecté et redirigé vers le tableau de bord admin

## Collections disponibles

Une fois connecté, vous pouvez gérer le contenu via ces collections :

### 🚗 **Cars** (Voitures)
Gérez votre flotte de véhicules :
- Nom du véhicule
- Description (EN/FR)
- Images
- Prix par jour
- Options (chauffeur, Wi-Fi, siège enfant, etc.)
- Catégorie (Compact, SUV, Luxury, etc.)

### 🏡 **Villas**
Gérez vos propriétés :
- Nom de la villa
- Description (EN/FR)
- Images
- Quartier (Palmeraie, Hivernage, etc.)
- Prix par nuit
- Nombre de chambres
- Équipements (piscine, jardin, etc.)

### 🛎️ **Concierge Packs**
Packages de services :
- Essential, Signature, Prestige
- Description des services inclus
- Prix

### 🎯 **Concierge À la Carte**
Services individuels :
- Nom du service
- Catégorie (Transport, Expérience, Bien-être, etc.)
- Description
- Prix indicatif

### 📝 **Blog Posts**
Articles de blog :
- Titre (EN/FR)
- Contenu (EN/FR)
- Image de couverture
- Auteur
- Date de publication
- Slug SEO

### 📄 **Pages**
Pages du site :
- Titre
- Contenu
- Slug

### 📬 **Leads**
Demandes de contact :
- Nom du client
- Email
- Téléphone
- Type de demande (Car, Villa, Concierge)
- Statut (New, Contacted, Qualified, etc.)
- Notes

### 🖼️ **Media**
Bibliothèque de médias :
- Upload d'images
- Gestion des fichiers
- Alt text pour SEO

## Conseils d'utilisation

### Contenu bilingue
La plupart des champs supportent EN et FR. Vous verrez des onglets pour chaque langue :
- Remplissez toujours la version EN (obligatoire)
- Ajoutez la version FR pour une expérience complète
- Si FR n'est pas rempli, le contenu EN sera affiché par défaut

### Slugs
Les slugs sont générés automatiquement à partir du titre, mais vous pouvez les modifier :
- Format : texte en minuscules, mots séparés par des tirets
- Exemple : "mercedes-classe-s" pour "Mercedes Classe S"

### Images
- **Format recommandé** : JPEG ou WebP
- **Taille maximale** :
  - Images générales : < 200 KB
  - Images hero : < 350 KB
- **Dimensions recommandées** :
  - Hero : 1920x1080px
  - Cards : 800x600px
  - Thumbnails : 400x300px

### SEO
Pour chaque contenu, n'oubliez pas de remplir :
- **Meta Title** : Titre pour les moteurs de recherche (60 caractères max)
- **Meta Description** : Description pour les résultats Google (160 caractères max)
- **Alt Text** : Description des images pour l'accessibilité

## En production

Une fois déployé sur Vercel, l'interface admin sera accessible sur :
```
https://votre-domaine.com/admin
```

**Important** : Assurez-vous que les variables d'environnement suivantes sont configurées dans Vercel :
- `DATABASE_URL` : URL de connexion Supabase PostgreSQL
- `PAYLOAD_SECRET` : Clé secrète pour Payload (générez une clé aléatoire sécurisée)
- `PAYLOAD_PUBLIC_SERVER_URL` : URL de votre site (ex: https://atlasdream.com)

## Support

Pour toute question sur Payload CMS :
- Documentation officielle : https://payloadcms.com/docs
- Discord communautaire : https://discord.com/invite/payload

## Raccourcis clavier

Dans l'éditeur Payload :
- `Cmd/Ctrl + S` : Sauvegarder
- `Cmd/Ctrl + Enter` : Publier
- `Esc` : Fermer le panneau latéral
