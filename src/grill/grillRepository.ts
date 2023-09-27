import { repository } from "../shared/repository.js"
import { Grill } from "./grillsEntity.js"

const grills : Grill[] = [
    new Grill(
        true,
        '3x2',
        'Gas grill',
        'ZhHpT-xTXQD-gixhh-hifm-uSC6G'
    )
]

export class GrillRepository implements repository<Grill>{
    public findAll(): Grill[] | undefined {
        return grills
    }

    public findOne(i: { id: string; }): Grill | undefined {
        return grills.find((grill) => grill.grillId === i.id)
    }

    public add(i: Grill): Grill | undefined {
        grills.push(i)
        return i
    }

    public update(i: Grill): Grill | undefined {
        const grillIdx = grills.findIndex((grill) => grill.grillId === i.grillId)

        if (grillIdx!== -1) {
            grills[grillIdx] = {  ...grills[grillIdx], ...i }
        }

        return grills[grillIdx]
    }

    public delete(i: { id: string; }): Grill | undefined {
        const grillIdx = grills.findIndex((grill) => grill.grillId === i.id)

        if (grillIdx!== -1) {
            const deletedGrill = grills.splice(grillIdx, 1)
            return deletedGrill[0]
        }
    }
}