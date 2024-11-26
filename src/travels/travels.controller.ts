import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException, HttpCode } from '@nestjs/common';
import { TravelsService } from './travels.service';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { TravelData } from './travels';

@Controller('travels')
export class TravelsController {
  constructor(private readonly travelsService: TravelsService) {}

  @Post()
  create(@Body() createTravelDto: CreateTravelDto) {
    return this.travelsService.create(createTravelDto);
  }

  @Get()
  findAll() {
    return this.travelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const TravelData: TravelData = this.travelsService.findOne(+id);
    if(TravelData === undefined){
      throw new BadRequestException("Nem letező id!");
    }
    return TravelData;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTravelDto: UpdateTravelDto) {
    try{
      return this.travelsService.update(+id, updateTravelDto);
    }catch(e){
      throw new NotFoundException("Nem található az id !");
    }
    
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if(!this.travelsService.remove(+id)){
      throw new BadRequestException("Rossz id!");
    }
  }
}
