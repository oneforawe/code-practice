#!/usr/bin/env python3
#filename: FunctionArguments.py

def print_names(name_of_leader, name_of_chef, name_of_surgeon, name_of_artist, name_of_builder):
    print(f'name_of_leader  = {name_of_leader}')
    print(f'name_of_chef    = {name_of_chef}')
    print(f'name_of_surgeon = {name_of_surgeon}')
    print(f'name_of_artist  = {name_of_artist}')
    print(f'name_of_builder = {name_of_builder}')

def print_args(*args):
    for arg in args:
        print(f'arg = {arg}')

def print_kwargs(**kwargs):
    for key, value in kwargs.items():
        print(f'{key.ljust(16)} = {value}')



if __name__ == '__main__':

    names_list = ['Greg', 'Grog', 'Grag', 'Grig', 'Grug']

    names_dict = { 'name_of_leader'  : 'Greg',
                   'name_of_chef'    : 'Grog',
                   'name_of_surgeon' : 'Grag',
                   'name_of_artist'  : 'Grig',
                   'name_of_builder' : 'Grug' }

    print('')
    print(f'names_list = {names_list}')
    print(f'names_dict = {names_dict}')

    print('')
    print(f'name_of_leader   =  names_dict["name_of_leader"]  = {names_dict["name_of_leader"]}'  + f'  =  names_list[0] = {names_list[0]}')
    print(f'name_of_chef     =  names_dict["name_of_chef"]    = {names_dict["name_of_chef"]}'    + f'  =  names_list[1] = {names_list[1]}')
    print(f'name_of_surgeon  =  names_dict["name_of_surgeon"] = {names_dict["name_of_surgeon"]}' + f'  =  names_list[2] = {names_list[2]}')
    print(f'name_of_artist   =  names_dict["name_of_artist"]  = {names_dict["name_of_artist"]}'  + f'  =  names_list[3] = {names_list[3]}')
    print(f'name_of_builder  =  names_dict["name_of_builder"] = {names_dict["name_of_builder"]}' + f'  =  names_list[4] = {names_list[4]}')

    print('')
    print('print_names(\'Greg\', \'Grog\', \'Grag\', \'Grig\', \'Grug\'):')
    print_names('Greg', 'Grog', 'Grag', 'Grig', 'Grug')

    print('')
    print('print_names(**names_dict):')
    print_names(**names_dict)

    print('')
    print('print_args(\'Greg\', \'Grog\', \'Grag\', \'Grig\', \'Grug\'):')
    print_args('Greg', 'Grog', 'Grag', 'Grig', 'Grug')

    print('')
    print('print_args(*names_list):')
    print_args(*names_list)

    print('')
    print('print_args(**names_dict):  --This isn\'t how **kwargs works.--')
    #print_args(**names_dict)

    print('')
    print('print_kwargs(**names_dict):')
    print_kwargs(**names_dict)


