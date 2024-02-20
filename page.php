<?php
// Vérifier si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Vérifier si les champs du formulaire sont vides
    if(empty($_POST['nom']) || empty($_POST['prenom']) || empty($_POST['email']) || empty($_POST['password'])) {
        echo "Veuillez remplir tous les champs du formulaire.";
        exit;
    }

    // Récupérer la valeur du champ de sélection de rôle
    $role = $_POST['role'];

    // Vérifier si l'utilisateur connecté a le rôle d'administrateur
    if($role === 'admin') {
        // Vérifier si l'utilisateur est authentifié en tant qu'administrateur
        $utilisateur_admin = true; // Remplacez par la vérification réelle

        if($utilisateur_admin) {
            // Connexion à la base de données
            $serveur = "localhost";
            $nom_utilisateur = "root";
            $motdepasse = "Melanie75516!";
            $base_de_donnees = "garage_v_parrot";

            $connexion = new mysqli($serveur, $nom_utilisateur, $motdepasse, $base_de_donnees);

            // Vérifier la connexion
            if ($connexion->connect_error) {
                die("Connexion échouée: " . $connexion->connect_error);
            }

            // Préparer la requête SQL d'insertion avec le rôle
            $sql = "INSERT INTO utilisateur (nom, prenom, email, nom_utilisateur, mot_de_passe_hash, role_enum) VALUES (?, ?, ?, ?, ?, ?)";

            // Préparer la déclaration
            $statement = $connexion->prepare($sql);
            if ($statement) {
                // Stocker les valeurs de $_POST dans des variables
                $nom = $_POST['nom'];
                $prenom = $_POST['prenom'];
                $email = $_POST['email'];
                $nom_utilisateur = strtolower(substr($_POST['prenom'], 0, 1) . $_POST['nom']);
                $mot_de_passe_hash = password_hash($_POST['password'], PASSWORD_DEFAULT);

                // Liaison des paramètres
                $statement->bind_param("ssssss", $nom, $prenom, $email, $nom_utilisateur, $mot_de_passe_hash, $role);
                
                // Exécution de la requête
                if ($statement->execute()) {
                    echo "Nouvel utilisateur créé avec succès.";
                } else {
                    echo "Erreur lors de la création de l'utilisateur: " . $statement->error;
                }

                // Fermer la déclaration
                $statement->close();
            } else {
                echo "Erreur lors de la préparation de la requête: " . $connexion->error;
            }

            // Fermer la connexion à la base de données
            $connexion->close();
        } else {
            echo "Seuls les administrateurs peuvent créer des comptes avec le rôle d'administrateur.";
        }
    } else {
        echo "Seuls les administrateurs peuvent créer des comptes avec le rôle d'administrateur.";
    }
} else {
    echo "Le formulaire n'a pas été soumis.";
}
?>
