import { Injectable } from '@nestjs/common';

interface SocketUser {
  fullName: string;
  id: string;
}

@Injectable()
export class SocketUserService {
  private roomUserMap: Map<string, SocketUser> = new Map();

  public getUser(id: string) {
    return this.roomUserMap.get(id);
  }

  public setUser(id: string, fullName: string) {
    this.roomUserMap.set(id, {
      id,
      fullName,
    });
  }

  public removeUser(id: string) {
    return this.roomUserMap.delete(id);
  }
}
