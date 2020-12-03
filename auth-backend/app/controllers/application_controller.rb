class ApplicationController < ActionController::API
    before_action :authorized
    
    def authorized
        render json: {error: "Please log in"} unless logged_in
    end

    def logged_in
        !!current_user
    end

    def current_user
        # takes token and decode to find user and gives back user 
        auth_header = request.headers["Authorization"]

        if auth_header 
            token = auth_header.split(" ")[1]
            secret = Rails.application.secrets.secret_key_base[0]
            begin
                @user_id = JWT.decode(token, secret)[0]["user_id"]
                @user = User.find(@user_id)
            rescue JWT::DecodeError
                nil
            end
        else
            render json: {message: 'Unauthorized user credentials'}, status: :unauthorized 
        end
    end
end
