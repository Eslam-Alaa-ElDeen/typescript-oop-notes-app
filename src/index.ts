
class Note{
    constructor(public id:number,public title:string,public content:string,public userId:User){
        this.id=id;
        this.title=title;
        this.content=content;
        this.userId=userId
    }
    
    preview():string{
        return `
        content : ${this.content}
        `
    }
}

class NoteBook {
    private notes: Note[] = [];

    addNote(
        id: number,
        title: string,
        content: string,
        author: User
    ) {
        const note = new Note(id, title, content, author);
        this.notes.push(note);
    }

    removeNote(id: number) {
        this.notes = this.notes.filter(
            note => note.id !== id
        );
    }

    getAllNotes(): Note[] {
        return [...this.notes];
    }
}

class User{
    private _password!:string;
    private _phone!:string
    private noteBooks:NoteBook[]=[];
    constructor(
        public id:number,
        public name:string,
        public email:string,
        public age:number,
        notebook:NoteBook[]=[]
    ){
        if (age < 18 || age > 60) {
            throw new Error("Age must be between 18 and 60.");
        }
        this.age=age,
        this.email=email,
        this.id=id,
        this.name=name
        notebook.map((oneNote)=>this.noteBooks.push(oneNote))
    }

    setPassword(pass:string){
        this._password=pass
    }
    getPassword():string{
        return this._password
    }

    setPhone(number:string){
        this._phone=number
    }
    getPhone():string{
        return this._phone
    }

    displayInfo():string{
        return `
            name : ${this.name}
            age : ${this.age}
            phone : ${this._phone}
            email : ${this.email}
            id : ${this.id}
        `
    }

    addNoteBook(notebook: NoteBook) {
        this.noteBooks.push(notebook);
    }

    removeNoteBook(notebook: NoteBook) {
        this.noteBooks = this.noteBooks.filter(
            book => book !== notebook
        );
    }
}

class Admin extends User{

        constructor(
        public id:number,
        public name:string,
        public email:string,
        public age:number
    ){
        super(id,name,email,age);
    }

    manageNotes(){
        return `Admin manage the notes`
    }
}

class Storage<T> {
    private items: T[] = [];

    addItem(item: T) {
        this.items.push(item);
    }

    removeItem(item: T) {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

    getAllItems(): T[] {
        return this.items;
    }
}
