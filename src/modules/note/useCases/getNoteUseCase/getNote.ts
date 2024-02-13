import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { NoteRepository } from "../../repositories/noteRepository";

interface GetNoteRequest {
  noteId: string;
  userId: string;
}

@Injectable()
export class GetNote {
  constructor(private noteRepository: NoteRepository){}

  async execute({ noteId, userId }: GetNoteRequest) {
    const note = await this.noteRepository.findById(noteId);

    if(!note) throw new NotFoundException();

    if(note.userId !== userId) throw new UnauthorizedException();

    return note;
  }
}    