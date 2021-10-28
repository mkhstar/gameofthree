import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { io } from 'socket.io-client';
import { AppModule } from '../../app.module';

describe('GameGateway', () => {
  let app: INestApplication;
  let p1: ReturnType<typeof io>;
  let p2: ReturnType<typeof io>;
  const playerOneName = 'Player 1';
  const playerTwoName = 'Player 2';

  beforeAll(async (done) => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.listen(3006);
    await app.init();
    p1 = io('http://localhost:3006', {
      autoConnect: true,
      auth: { fullName: playerOneName },
    });
    p2 = io('http://localhost:3006', {
      autoConnect: true,
      auth: { fullName: playerTwoName },
    });
    p1.on('connect', () => {
      p2.on('connect', done);
    });
  });

  afterAll(async () => {
    await app.close();
  });

  let currentRoomId: string;

  it('Player 1 Should Create Room', (done) => {
    p1.once('NEW_GAME_ROOM_CREATED', (roomId) => {
      expect(typeof roomId).toBe('string');
      currentRoomId = roomId;
      done();
    });

    p1.emit('game-setup', { type: 'CREATE_NEW_GAME' });
  });

  it('Player 2 Should Join Room', (done) => {
    p2.once('JOINED_GAME_ROOM', (fullName, socketId) => {
      expect(typeof socketId).toBe('string');
      expect(typeof fullName).toBe('string');
      expect(fullName).toBe(playerTwoName);
      expect(socketId).toBe(p2.id);
      done();
    });

    p2.emit('game-setup', { type: 'JOIN_GAME_ROOM', roomId: currentRoomId });
  });

  it('Player 1 should be able to initialize a number', (done) => {
    p1.once('GAME_INITIALIZED', (fullName, socketId) => {
      expect(typeof socketId).toBe('string');
      expect(typeof fullName).toBe('string');
      expect(fullName).toBe(playerOneName);
      expect(socketId).toBe(p1.id);
      done();
    });

    p1.emit('game-flow', {
      type: 'INITIALIZE_GAME',
      roomId: currentRoomId,
      initialNumber: 56,
    });
  });

  it('Player 2 should be able to send -1, 0 or 1', (done) => {
    p2.once('GAME_FLOW', (socketId) => {
      expect(typeof socketId).toBe('string');
      expect(socketId).toBe(p2.id);
      done();
    });

    p2.emit('game-flow', {
      type: 'GAME_OPERATION',
      roomId: currentRoomId,
      selectedNumber: 1,
    });
  });
  it('Player 1 should be able to send -1, 0 or 1', (done) => {
    p2.once('GAME_FLOW', (socketId) => {
      expect(typeof socketId).toBe('string');
      expect(socketId).toBe(p1.id);
      done();
    });

    p1.emit('game-flow', {
      type: 'GAME_OPERATION',
      roomId: currentRoomId,
      selectedNumber: -1,
    });
  });
  it('Player 2 should be able to send -1, 0 or 1', (done) => {
    p1.once('GAME_FLOW', (socketId) => {
      expect(typeof socketId).toBe('string');
      expect(socketId).toBe(p2.id);
      done();
    });

    p2.emit('game-flow', {
      type: 'GAME_OPERATION',
      roomId: currentRoomId,
      selectedNumber: 0,
    });
  });
  it('Expects gameover and Player 1 to win', (done) => {
    p1.once('GAME_OVER', (socketId) => {
      expect(typeof socketId).toBe('string');
      expect(socketId).toBe(p1.id);
      done();
    });

    p1.emit('game-flow', {
      type: 'GAME_OPERATION',
      roomId: currentRoomId,
      selectedNumber: 1,
    });
  });
});
