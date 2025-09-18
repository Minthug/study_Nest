import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Cat } from './entity/cats.entity';


@Injectable()
export class CatsService {
    constructor(
        @InjectRepository(Cat)
        private catsRepository: Repository<Cat>,
    ){}


    findAll(): Promise<Cat[]> {
        return this.catsRepository.find();
    }


    /*추천: findOneOrFail이 더 간결하고 RESTful하게 동작합니다! */
    findOne(id: number): Promise<Cat> {
        return this.catsRepository.findOneOrFail({
            where: { id }
        });
    }

    /*
    async findOne(id: number): Promise<Cat> {
        const cat = await this.catsRepository.findOne({
            where: { id }
        });

        if (!cat) {
            throw new Error(`Cat with id ${id} not found`);
        }
        return cat;
    }
    */

    async create(cat: Cat): Promise<void> {
        await this.catsRepository.save(cat);
    }

    async remove(id: number): Promise<void> {
        await this.catsRepository.delete(id);
    }
}
