import { UserService } from './user.service';
import { of } from 'rxjs';

describe('UserService', () => {
    let service: UserService;
    let mockHttpClient;

    beforeEach(() => {

        mockHttpClient = jasmine.createSpyObj(['get']);
        service = new UserService(mockHttpClient);
    });

    describe('get', () =>{
        it('should call get method', () => {
            mockHttpClient.get.and.returnValue(of(true));
            service.getUser(1);
            expect(mockHttpClient.get).toHaveBeenCalled();
        });
    });
});
