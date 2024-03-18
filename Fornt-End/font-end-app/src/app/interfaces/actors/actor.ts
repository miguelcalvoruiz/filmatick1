export interface actorDTO {
    id:number;
    name: string;
    birthdate: Date;
    photo: string;
    biography: string;
}

export interface actorCreationDTO {
    name: string;
    birthdate: Date;
    photo: File;
    biography: string;
}

export interface actorMovieDTO {
    id: number;
    name: string;
    character: string;
    photo: string;
}