import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from 'pokemon/entities/pokemon.entity';
import { isUUID, IsUUID } from 'class-validator';


@Injectable()
export class PokemonService {

constructor(
  @InjectModel(Pokemon.name)
  private readonly pokemonModel: Model<Pokemon>
){}


  async create(createPokemonDto: CreatePokemonDto)
   {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      
          const pokemon = await this.pokemonModel.create(createPokemonDto)
          return pokemon;
      
    } catch (error: any) {
        this.handleExceptions(error)
    }

  }

  findAll() {
    return `This action returns all pokemon`;
  }

 async findOne(term: string) {
    let pokemon: Pokemon | null = null

    if( !isNaN(+term)) {
        pokemon = await this.pokemonModel.findOne({no: +term})  
    }

    if (!pokemon && isValidObjectId(term) ) {
        pokemon = await this.pokemonModel.findById(term);
    }

      if ( !pokemon ) {
        pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });
    }

    if ( !pokemon) throw new NotFoundException(`Pokemon with id, name or no  "${term}" not found`);


    return pokemon;
  }


  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name) 
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    
  try {
    await pokemon.updateOne(updatePokemonDto);
    return { ...pokemon.toJSON(), ...updatePokemonDto };

  } catch (error: any) {
   this.handleExceptions(error)
  }
}

  async remove(id: string) {
    // const pokemon= await this.findOne(id);
    // await pokemon.deleteOne ()
    // return `Delete pokemon success`
// const result = await this.pokemonModel.findByIdAndDelete(id);

const {deletedCount} = await this.pokemonModel.deleteOne({_id: id});
 if (deletedCount === 0)
  throw new BadRequestException(`Pokemonwith id "${id}" not found`)
    return;
  }

  private handleExceptions( error: any){
     if (error.code === 11000) {
      throw new BadRequestException(`Pokemon ya existe en la DB: ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`No se pudo actualizar/Crear el Pokemon - Revisa los logs`);
  
  }



}
