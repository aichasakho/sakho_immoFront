export interface Bien {
  id?: number;
  titre: string;
  description: string;
  prix: number;
  disponible: boolean;
  type: 'appartement' | 'studio' | 'magasin' | 'terrain' | 'maison';
  imagePath?: string; // Ajouter cette ligne pour gérer le chemin de l'image
}
