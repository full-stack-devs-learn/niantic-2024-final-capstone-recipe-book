export class Ingredient
{
    aisle?: string;
    amount!: number;
    id!: number;
    image!: string;
    measures!: any; // {object of {objects metric}, {& object us}}
    meta?: string[];
    name!: string;
    original?: string;
    originalName?: string;
    unit!: string;
}