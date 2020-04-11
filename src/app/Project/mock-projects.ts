import { Project } from './project.model';

const JsonRecipes = [
  {
    name : 'Résidentie Pégoud',
    beschrijving : "Ruime residentie met 10 appartementen in centrum Waregem",
    producten : ['Loft 1', 'Loft2', '1 kamer Appartement', '2 kamer Appartement']
  },
  {
    name : 'Verkaveling Baliekouter',
    beschrijving : "Grote verkaveling vlakbij het recreatiedomein de baliekouter.",
    producten : ['Villa 1', 'Villa 2', 'Halfopen 1', 'Gesloten 1']
  }
];
export const PROJECTS: Project[] = JsonRecipes.map(Project.fromJSON);