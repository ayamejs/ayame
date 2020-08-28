// TODO: This is incomplete and I'm slowly adding to it.
// Will need help from someone who knows TypeScript very well.
import { Client, UserResolvable, Collection, Message } from "discord.js";

declare module "ayame" {
  export class AyameClient extends Client {
    public isOwner(user: UserResolvable): boolean;
    public registerStore(store: Store<any>): this;
  }

  export class Piece {
    public client: AyameClient;
    public enabled: boolean;

    public reload(): Promise<Piece>;
    public enable(): Piece;
    public disable(): Piece;
    public unload();
    public init(): Promise<void>;
    public get type(): string;
  }

  export class Store<V extends Piece> extends Collection<string, V> {
    public client: AyameClient;
    public name: string;

    public constructor(client: AyameClient, name: string);
    public registerDirectory(dir: string): this;
    public get userDirectory(): string;
    // ok how tf do i override this without TS screaming.
    // public set(piece: V); V;
    public load(dir: string, file: string): V;
    public init(): Promise<void>;
    public loadFiles(dir: string): Promise<number>;
    public loadAll(): Promise<number>;
  }

  export class AyameMessage extends Message {}

  export class Command extends Piece {
    public check(msg: AyameMessage, args: string[]): Promise<boolean>;
    public run(msg: AyameMessage, args: string[]): Promise<AyameMessage | AyameMessage[] | null>;
  }

  export class Event extends Piece {
    public raw: boolean;

    public check(...args: any): Promise<boolean>;
    public run(...args: any): Promise<any>;
  }
}
