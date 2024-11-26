import { Injectable } from '@nestjs/common';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { Travels, TravelData, TravelDataWithoutId } from './travels'

@Injectable()
export class TravelsService {
  travels = new Travels();

  /**
   * Creates new travels entry 
   * @param createTravelDto 
   * @returns The travel destination that has been created with ID included
   */
  create(createTravelDto: CreateTravelDto): TravelData {
    return this.travels.add({...createTravelDto, discount: 0});
  }

  /**
   * Returns the details of travel destinations
   * @returns All travel destinations and its details
   */
  findAll(): TravelData[] {
    return this.travels.getAll();
  }

  /**
   *  Find a travel destination by ID
   * @param id ID of the travel destination you want to find
   * @returns Travel details with ID or if ID not found undefined
   */
  findOne(id: number): TravelData | undefined {
    return this.travels.getById(id);
  }

  /**
   * Updates a travel destination without changing ID
   * @param id ID of the travel destination you want to update
   * @param updateTravelDto 
   * @returns The details of the updated travel destination with ID
   * @throws {Error} There's no travel destination with the ID
   */
  update(id: number, updateTravelDto: UpdateTravelDto): TravelData {
    const oldTravelData: TravelData = this.travels.getById(id);
    const newTravelData: TravelData = {
      ...oldTravelData,
      ...updateTravelDto,
    }
    return this.travels.replace(id, newTravelData);
  }

  /**
   * Delete a travel destination by ID
   * @param id The Id of the travel destination you want to delete
   * @returns True if the ID is valid, otherwise false
   */
  remove(id: number): boolean {
    return this.travels.remove(id);
  }
}
