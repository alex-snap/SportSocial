# CoffeeScript
class ProfileView extends Controller('socialApp.controllers')
    constructor: (
        $scope
        $state
        $stateParams
        $rootScope
        mixpanel
        profileService
        modalService)->

        $scope.$root.title = ['Fortress | ', $rootScope.user.fullName].join('')

        _this = this

        # user info model
        _this.user = {
            loaded: false
        }

        # append new record
        # ---------------
        _this.newRecord = (res)->
            _this.user.journals.unshift res.data

        # get user profile info
        # ---------------
        profileService.getInfo($stateParams.userId).then((res)->
            _this.user = res.data
            if $rootScope.user.id == +$stateParams.userId
                _this.user.isOwner = true
            else
                _this.user.isOwner = false
            _this.user.loaded = true
        )

        # journal list fake model
#        _this.wall = [
#            {
#                id: 1,
#                text: 'asdasdasdasdasd',
#                date: '09/05/2015'
#                media: [
#                    { id: 1, type: 'video', img: 'srctest1' },
#                    { id: 2, type: 'image', img: 'srctest2' },
#                    { id: 3, type: 'video', img: 'srctest3' },
#                    { id: 4, type: 'image', img: 'srctest4' }
#                ],
#                likes: {
#                    isLiked: true
#                    list: [
#                        { id: 1, fullName: 'Владимир Владимирович', avatar: 'avatartest1' },
#                        { id: 2, fullName: 'Владимир Владимирович', avatar: 'avatartest1' },
#                        { id: 3, fullName: 'Владимир Владимирович', avatar: 'avatartest1' },
#                        { id: 4, fullName: 'Владимир Владимирович', avatar: 'avatartest1' }
#                    ]
#                    count: 23
#                }
#            },
#            {
#                id: 2,
#                text: 'asdasdasdasdasd',
#                date: '09/05/2015'
#                media: [
#                    { id: 1, type: 'image', img: 'srctest1' },
#                    { id: 2, type: 'image', img: 'srctest2' },
#                    { id: 3, type: 'video', img: 'srctest3' },
#                    { id: 4, type: 'image', img: 'srctest4' }
#                ],
#                likes: {
#                    isLiked: false
#                    list: [
#                        { id: 1, fullName: 'Владимир Владимирович', avatar: 'avatartest1' },
#                        { id: 2, fullName: 'Владимир Владимирович', avatar: 'avatartest1' },
#                        { id: 3, fullName: 'Владимир Владимирович', avatar: 'avatartest1' },
#                        { id: 4, fullName: 'Владимир Владимирович', avatar: 'avatartest1' }
#                    ]
#                    count: 23
#                }
#            },
#            {
#                id: 3,
#                text: 'asdasdasdasdasd',
#                date: '09/05/2015'
#                media: [],
#                likes: {
#                    isLiked: true
#                    list: [
#                        { id: 1, fullName: 'Владимир Владимирович', avatar: 'avatartest1' },
#                        { id: 2, fullName: 'Владимир Владимирович', avatar: 'avatartest1' },
#                        { id: 3, fullName: 'Владимир Владимирович', avatar: 'avatartest1' },
#                        { id: 4, fullName: 'Владимир Владимирович', avatar: 'avatartest1' }
#                    ]
#                    count: 23
#                }
#            }
#        ]