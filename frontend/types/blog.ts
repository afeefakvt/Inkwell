export interface IBlog{
    _id:string; 
    title:string;
    content:string;
    author: {name:string,email:string};
    createdAt: string;
}