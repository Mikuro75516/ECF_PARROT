<?php
// Activer l'affichage des erreurs PHP
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Paramètres de connexion à la base de données
$serveur = "localhost";
$nom_utilisateur = "root";
$motdepasse = "";
$base_de_donnees = "garage_v_parrot";

try {
    $pdo = new PDO("mysql:host=$serveur;dbname=$base_de_donnees", $nom_utilisateur, $motdepasse);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Vérifier si un id_voiture est passé en paramètre dans l'URL
    $id_voiture = isset($_GET['id_voiture']) ? $_GET['id_voiture'] : null;

    if ($id_voiture) {
        // Requête pour une voiture spécifique
        $sql = "SELECT * FROM voiture WHERE id_voiture = :id_voiture";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id_voiture', $id_voiture, PDO::PARAM_INT);
        $stmt->execute();
        $voiture = $stmt->fetch(PDO::FETCH_ASSOC);
    } else {
        // Requête pour récupérer toutes les voitures
        $sql = "SELECT * FROM voiture";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $voitures = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Vérifier si des voitures ont été trouvées
    if ($id_voiture && $voiture) {
        // Afficher les détails de la voiture spécifique
        echo '<p>Marque: ' . $voiture['marque'] . '</p>';
        echo '<p>Modèle: ' . $voiture['modele'] . '</p>';
        echo '<p>Kilométrage: ' . $voiture['kilometrage'] . '</p>';
        echo '<p>Année de mise en circulation: ' . $voiture['annee_mise_circulation'] . '</p>';
        echo '<p>Prix: ' . number_format($voiture['prix_euro'], 2, ',', ' ') . ' €</p>';
    } elseif (!$id_voiture && $voitures) {
        // Afficher toutes les voitures
        foreach ($voitures as $voiture) {
            echo '<p>Marque: ' . $voiture['marque'] . '</p>';
            echo '<p>Modèle: ' . $voiture['modele'] . '</p>';
            echo '<p>Kilométrage: ' . $voiture['kilometrage'] . '</p>';
            echo '<p>Année de mise en circulation: ' . $voiture['annee_mise_circulation'] . '</p>';
            echo '<p>Prix: ' . number_format($voiture['prix_euro'], 2, ',', ' ') . ' €</p>';
            echo '<hr>'; // Séparateur entre les voitures
        }
    } else {
        echo "Aucune voiture trouvée avec l'identifiant spécifié.";
    }
} catch(PDOException $e) {
    echo "Erreur: " . $e->getMessage();
}
?>
