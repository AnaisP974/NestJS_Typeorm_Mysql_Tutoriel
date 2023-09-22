import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost.dto';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUserProfile.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    // read
    @Get()
    getUsers() {
        return this.userService.findUsers();
    }

    // create
    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    // update
    @Put(':id')
    async updateUserById(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateUserDto: UpdateUserDto,
    ) {
        await this.userService.updateUser(id, updateUserDto);
    }

    // delete
    @Delete(':id')
    async deleteUserById(
        @Param('id', ParseIntPipe) id: number) {
        await this.userService.deleteUser(id);
    }

    // Create New profile
    @Post(':id/profiles')
    createUserProfile(
        @Param('id', ParseIntPipe) id: number, 
        @Body() createUserProfileDto: CreateUserProfileDto,
    ) {
        return this.userService.createUserProfile(id, createUserProfileDto);
    }

    // Create New post
    @Post(':id/posts')
    createUserPost(
        @Param('id', ParseIntPipe) id: number, 
        @Body() createUserPostDto: CreateUserPostDto,
    ) {
        return this.userService.createUserPost(id, createUserPostDto);
    }

}
