import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Req, UseInterceptors } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaCreateDtoInput } from './dto/media-create.input.dto';
import { TokenGuard } from 'src/interceptors/token-guard.interceptor';
import { MediaUpdateDtoInput, MediaUpdateParamDtoInput } from './dto/media-update.input.dto';
import { MediaDeleteParamDtoInput } from './dto/media-delete.input.dto';

@Controller('medias')
export class MediaController {
  constructor(private readonly mediaService: MediaService) { }

  @UseInterceptors(TokenGuard)
  @Post()
  async create(@Req() req: RequestWithAuthId, @Body() createMediaDto: MediaCreateDtoInput) {
    const media = await this.mediaService.create({
      data: {
        title: createMediaDto.title,
        description: createMediaDto.description,
        url: createMediaDto.mediaPicture,
        profile: {
          connect: {
            userId: req.authId,
          }
        }
      }
    });
    return {
      message: 'Media created successfully',
      data: media,
    }
  }

  @UseInterceptors(TokenGuard)
  @Get()
  async findAll(@Req() req: RequestWithAuthId) {
    const medias = await this.mediaService.findAll({
      where: {
        profile: {
          userId: req.authId,
        },
      },
    });
    return {
      message: 'Media fetched successfully',
      data: medias,
    }
  }

  @UseInterceptors(TokenGuard)
  @Put(':id')
  async update(@Req() req: RequestWithAuthId, @Param() param: MediaUpdateParamDtoInput, @Body() updateMediaDto: MediaUpdateDtoInput) {
    const media = await this.mediaService.get({
      where: {
        id: param.id,
        profile: {
          userId: req.authId,
        }
      }
    });
    if (!media) {
      throw new NotFoundException('Media not found');
    }
    await this.mediaService.update({
      where: {
        id: param.id,
        profile: {
          userId: req.authId,
        }
      },
      data: {
        title: updateMediaDto.title,
        description: updateMediaDto.description,
        url: updateMediaDto.mediaPicture,
      }
    });
    return {
      message: 'Media updated successfully',
      data: null,
    }
  }

  @Delete(':id')
  async delete(@Req() req: RequestWithAuthId, @Param() param: MediaDeleteParamDtoInput) {
    const media = await this.mediaService.get({
      where: {
        id: param.id,
        profile: {
          userId: req.authId,
        }
      }
    });
    if (!media) {
      throw new NotFoundException('Media not found');
    }
    await this.mediaService.delete({
      where: {
        id: param.id,
        profile: {
          userId: req.authId,
        }
      }
    });
    return {
      message: 'Media deleted successfully',
      data: null,
    }
  }
}
