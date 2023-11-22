import { FastifyRequest, FastifyReply } from "fastify"
import { ExerciseData } from "../../../@types/Exercise/Index"
import { Exercise } from "../../../database/schemas/Exercises"
import ExerciseController from "../../../controllers/Exercises"

const url = '/create'
const method = 'POST'

type Request = {
    Body: ExerciseData
}

async function handler(req: FastifyRequest<Request>, rep: FastifyReply) {
    if(!req.body) return rep.status(400).send({
        error: 'MISSING_DATA',
        message: 'Não foi possivel realizar está ação'
    })

    const { name, createdBy, difficulty, image, muscle } = req.body

    if(!name || !createdBy || !difficulty || !image || !muscle) return rep.status(400).send({
        error: 'MISSING_DATA',
        message: 'Não foi possivel realizar está ação'
    })

    const exists = await Exercise.findOne({ name })

    if(exists) return rep.status(400).send({
        error: 'THIS_EXERCISE_ALREADY_EXISTS',
        message: `Este exercicio '${exists.name}' já existe!`
    })

    const exercise = new ExerciseController()

    Exercise.create({
        name,
        muscle,
        image,
        createdBy,
        createdAt: new Date()
    }).then((data) => {
        data?.save()
        .then((d) => console.log(d))
        .catch((err) => err)

        return rep.status(201).send()
    })
    .catch((err) => {
        return rep.status(500).send({
            error: err.name,
            message: 'Não foi possivel realizar está ação neste momento.'
        })
    })   
}

export { method, url, handler }