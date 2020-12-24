import type { IEmitter } from "../Interfaces/IEmitter";
import type { RecursivePartial } from "tsparticles/Types";
import type { ICoordinates } from "tsparticles/Core/Interfaces/ICoordinates";
import { MoveDirection, MoveDirectionAlt } from "tsparticles/Enums";
import type { IParticles } from "tsparticles/Options/Interfaces/Particles/IParticles";
import { EmitterRate } from "./EmitterRate";
import { EmitterLife } from "./EmitterLife";
import { deepExtend } from "tsparticles/Utils";
import { EmitterSize } from "./EmitterSize";
import type { IOptionLoader } from "tsparticles/Options/Interfaces/IOptionLoader";
import { AnimatableColor } from "tsparticles/Options/Classes/AnimatableColor";
import { EmitterSpin } from "./EmitterSpin";

/**
 * [[include:Options/Plugins/Emitters.md]]
 * @category Emitters Plugin
 */
export class Emitter implements IEmitter, IOptionLoader<IEmitter> {
    public direction: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt;
    public life;
    public particles?: RecursivePartial<IParticles>;
    public position?: RecursivePartial<ICoordinates>;
    public rate;
    public size?: EmitterSize;
    public spin;
    public spawnColor?: AnimatableColor;

    constructor() {
        this.direction = MoveDirection.none;
        this.life = new EmitterLife();
        this.rate = new EmitterRate();
        this.spin = new EmitterSpin();
    }

    public load(data?: RecursivePartial<IEmitter>): void {
        if (data === undefined) {
            return;
        }

        if (data.size !== undefined) {
            if (this.size === undefined) {
                this.size = new EmitterSize();
            }

            this.size.load(data.size);
        }

        if (data.direction !== undefined) {
            this.direction = data.direction;
        }

        this.life.load(data.life);

        if (data.particles !== undefined) {
            this.particles = deepExtend({}, data.particles) as RecursivePartial<IParticles>;
        }

        this.rate.load(data.rate);

        if (data.position !== undefined) {
            this.position = {
                x: data.position.x,
                y: data.position.y,
            };
        }

        this.spin.load(data.spin);

        if (data.spawnColor !== undefined) {
            if (this.spawnColor === undefined) {
                this.spawnColor = new AnimatableColor();
            }

            this.spawnColor.load(data.spawnColor);
        }
    }
}