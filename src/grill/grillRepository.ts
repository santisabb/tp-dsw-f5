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
    public async findAll(): Promise <Grill[] | undefined> {
        return await grills
    }

    public async findOne(i: { id: string; }): Promise <Grill | undefined> {
        return await grills.find((grill) => grill.grillId === i.id)
    }

    public async add(i: Grill): Promise <Grill | undefined> {
        await grills.push(i)
        return i
    }

    public async update(i: Grill): Promise <Grill | undefined> {
        const grillIdx = await grills.findIndex((grill) => grill.grillId === i.grillId)

        if (grillIdx!== -1) {
            grills[grillIdx] = {  ...grills[grillIdx], ...i }
        }

        return grills[grillIdx]
    }

    public async delete(i: { id: string; }): Promise <Grill | undefined> {
        const grillIdx = await grills.findIndex((grill) => grill.grillId === i.id)

        if (grillIdx!== -1) {
            const deletedGrill = grills.splice(grillIdx, 1)
            return deletedGrill[0]
        }
    }
}