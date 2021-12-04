import {
  HttpException,
  HttpService,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

interface IGDBToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}

interface IGDBGame {
  IGDBid: number;
  category: number;
  cover: number;
  name: string;
}

@Injectable()
export class GameService {
  gamesFromIGDB: IGDBGame[] = [];

  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.loadGames();
  }

  create(createGameInput: CreateGameInput) {
    return 'This action adds a new game';
  }

  async findAll() {
    return await this.gameRepository.find({ order: { name: 'ASC' } });
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameInput: UpdateGameInput) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }

  private async loadGames(): Promise<void> {
    const IGDBAccessToken = await this.getAccessTokenFromIGDB().then(
      (data) => data.access_token,
    );
    let numberOfGamesInTheLastResponseFromIGDB = 500;
    let offset = 0;
    while (numberOfGamesInTheLastResponseFromIGDB === 500) {
      const gamesStack = await this.getGamesFromIGDB(IGDBAccessToken, offset);
      this.addGamesInList(gamesStack);
      numberOfGamesInTheLastResponseFromIGDB = gamesStack.length;
      offset += 500;
    }
    Logger.verbose(
      `Le nombre de jeux total récupérés avec IGDB est de : ${this.gamesFromIGDB.length} jeux`,
      'IMPORT GAMES FROM IGDB',
    );
  }

  private async getAccessTokenFromIGDB(): Promise<IGDBToken> {
    const clientID = this.configService.get('IGDB_CLIENT_ID');
    const clientSecret = this.configService.get('IGDB_CLIENT_SECRET');
    try {
      return await this.http
        .post(
          `https://id.twitch.tv/oauth2/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=client_credentials`,
        )
        .toPromise()
        .then((response) => {
          return response.data as IGDBToken;
        });
    } catch (err) {
      throw new HttpException(
        'Impossible to get IGDB token',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  private async getGamesFromIGDB(
    IGDBAccesstoken: string,
    offset: number,
  ): Promise<IGDBGame[]> {
    const headersRequest = {
      Accept: 'application/json',
      'Client-ID': this.configService.get('IGDB_CLIENT_ID'),
      Authorization: `Bearer ${IGDBAccesstoken}`,
    };
    // A modifier selon ce qu'on veut récupérer
    // Exemple : platforms.category ajoute le type de plateforme et platforms.name le nom de la plateforme
    const data = `fields name,category,cover; where category = 0 & platforms.category = 6; limit 500; offset ${offset};`;
    try {
      return await this.http
        .post(`https://api.igdb.com/v4/games`, data, {
          headers: headersRequest,
        })
        .toPromise()
        .then((response) => {
          return response.data as IGDBGame[];
        });
    } catch (err) {
      throw new HttpException(
        'Impossible to get games from IGDB',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  private addGamesInList(games: IGDBGame[]) {
    games.forEach((game) => this.gamesFromIGDB.push(game));
  }
}
