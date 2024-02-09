import { 
  Controller, 
  Get, 
  HttpCode, 
  HttpStatus, 
  Post, 
  Request, 
  UseGuards 
} from "@nestjs/common";
import { AuthRequestModel } from "./models/authRequestModel";
import { SignInUseCase } from "src/modules/auth/useCases/signInUseCase/signInUseCase";
import { LocalAuthGuard } from "./guards/localAuth.guard";
import { Public } from "./decorators/isPublic";
import { JwtAuthGuard } from "./guards/jwtAuth.guard";
import { AuthenticatedRequestModel } from "./models/authenticateRequestModel";

@Controller()
export class AuthControler {
  
  constructor(private signInUseCase: SignInUseCase) {}

  @Post('signIn')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() request: AuthRequestModel){
    
    const access_token = await this.signInUseCase.execute({ 
      user: request.user
    });

    return { access_token };
  }
  
  @Get('test')
  @UseGuards(JwtAuthGuard)
  async test(@Request() request: AuthenticatedRequestModel){
    return request.user
  }
}