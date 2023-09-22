import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Post';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, CreateUserPostParams, CreateUserProfileParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
        @InjectRepository(Post) private postRepository: Repository<Post>,
    ) {}
    // récupérer tous les users
    findUsers() {
        return this.userRepository.find({ relations: ['profile', 'posts'] });
    }
    // créer un user
    createUser(userDetails: CreateUserParams) {
        const newUser = this.userRepository.create({ ...userDetails, createdAt: new Date()});
        return this.userRepository.save(newUser);
    }
    // modifier un user
    updateUser(id: number, updateUserDetails: UpdateUserParams){
        return this.userRepository.update({ id }, { ...updateUserDetails });
    }
    //supression d'un user
    deleteUser(id: number){
        return this.userRepository.delete({ id });
    }
    
    // créer un profil
    async createUserProfile(
        id: number,
        createUserProfileDetails: CreateUserProfileParams,
    ){
        // rechercher l'utilisateur
        const user = await this.userRepository.findOneBy({ id });
        if(!user) 
            throw new HttpException(
                'User not found. Cannot create Profile', 
                HttpStatus.BAD_REQUEST,
            );
        const newProfile = this.profileRepository.create(createUserProfileDetails);
        const savedProfile = await this.profileRepository.save(newProfile);
        // mettre à jour l'utilisateur
        user.profile = savedProfile;
        return this.userRepository.save(user);
    }

    // créer un post
    async createUserPost(
        id: number,
        createUserPostDetails: CreateUserPostParams,
    ){
        // rechercher l'utilisateur
        const user = await this.userRepository.findOneBy({ id });
        if(!user) 
            throw new HttpException(
                'User not found. Cannot create Profile', 
                HttpStatus.BAD_REQUEST,
            );
        // constante du nouvel article associé au user
        const newPost = this.postRepository.create({
            ...createUserPostDetails,
            user,
        });
        // enregistre le nouvel article associé au user
        return this.postRepository.save(newPost);
    }
}
